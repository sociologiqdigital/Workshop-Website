const crypto = require('crypto');
const Registration = require('../models/Registration');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');

// 1. INITIATE PAYMENT
exports.initiatePayment = async (req, res, next) => {
    try {
        const { name, email, phone, address, selectedDate, amount, workshopId, registrationType } = req.body;
        const txnid = "TXN" + Date.now();

        // Create initial pending record
        const newRegistration = new Registration({
            workshopId, 
            name, 
            email, 
            phone, 
            address, 
            registrationType, 
            selectedDate, 
            amount,
            transactionId: txnid, 
            paymentStatus: 'Pending'
        });
        await newRegistration.save();

        const key = process.env.PAYU_MERCHANT_KEY;
        const salt = process.env.PAYU_MERCHANT_SALT;
        const productinfo = "Workshop_Registration";
        const firstname = name.split(' ')[0].trim(); 

        // Generate PayU Hash
        const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
        const hash = crypto.createHash('sha512').update(hashString).digest('hex');

        res.status(200).json({
            hash, txnid, key, amount, productinfo, email, phone, name: firstname,
            surl: `${process.env.BACKEND_URL}/api/payment/callback`,
            furl: `${process.env.BACKEND_URL}/api/payment/callback`
        });
    } catch (error) {
        next(error);
    }
};

// 2. PAYU CALLBACK (Handle Success/Failure)
exports.payuCallback = async (req, res, next) => {
    try {
        const { status, txnid, amount, productinfo, firstname, email, hash, key } = req.body;
        const salt = process.env.PAYU_MERCHANT_SALT;
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        const reverseHashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
        const calculatedHash = crypto.createHash('sha512').update(reverseHashString).digest('hex');

        if (calculatedHash !== hash) {
            console.error("❌ SECURITY ALERT: Hash Mismatch!");
            return res.redirect(`${frontendUrl}/payment-failure?reason=hash_mismatch`);
        } 

        if (status === 'success') {
            const registration = await Registration.findOneAndUpdate(
                { transactionId: txnid },
                { paymentStatus: 'Success', payuResponse: req.body },
                { new: true }
            ).populate('workshopId');

            if (registration) {
                // Prepare email confirmation
                const emailHtml = `<h2>Registration Confirmed!</h2>
                                   <p>Hi ${registration.name}, your seat is reserved for <b>${registration.workshopId?.title}</b>.</p>
                                   <p><b>Type:</b> ${registration.registrationType}</p>`;

                await sendEmail({
                    email: registration.email,
                    subject: `✨ Confirmed: ${registration.workshopId?.title}`,
                    message: emailHtml
                });
            }
            return res.redirect(`${frontendUrl}/payment-success?bookingId=${txnid}`);
        } else {
            await Registration.findOneAndUpdate({ transactionId: txnid }, { paymentStatus: 'Failed' });
            return res.redirect(`${frontendUrl}/payment-failure?bookingId=${txnid}`);
        }
    } catch (error) {
        next(error);
    }
};

// 3. ADMIN: GET REGISTRATIONS LIST
exports.getSuccessfulRegistrations = async (req, res, next) => {
    try {
        const { workshopId } = req.query;
        let query = { paymentStatus: 'Success' };
        if (workshopId && workshopId !== 'all') {
            query.workshopId = workshopId;
        }

        const registrations = await Registration.find(query)
            .populate('workshopId', 'title price') 
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: registrations });
    } catch (error) {
        next(error);
    }
};

// 4. ADMIN: GET DASHBOARD STATS (With Category Breakdown)
exports.getDashboardStats = async (req, res, next) => {
    try {
        const { workshopId } = req.query;
        let matchQuery = { paymentStatus: 'Success' };

        if (workshopId && workshopId !== 'all') {
            matchQuery.workshopId = new mongoose.Types.ObjectId(workshopId);
        }

        const stats = await Registration.aggregate([
            { $match: matchQuery },
            {
                $facet: {
                    "totals": [
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$amount" },
                                totalRegistrations: { $count: {} }
                            }
                        }
                    ],
                    "typeBreakdown": [
                        {
                            $group: {
                                _id: "$registrationType",
                                count: { $sum: 1 }
                            }
                        }
                    ]
                }
            }
        ]);

        const result = {
            totalRevenue: stats[0].totals[0]?.totalRevenue || 0,
            totalRegistrations: stats[0].totals[0]?.totalRegistrations || 0,
            breakdown: stats[0].typeBreakdown 
        };

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};