const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Workshop = require('./models/Workshop');

dotenv.config();

const seedData = async () => {
    try {
        // 1. Connect to Database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🌱 Connected to MongoDB for seeding...");

        // 2. Clear existing data (Optional - use with caution)
        await Admin.deleteMany({});
        await Workshop.deleteMany({});

        // 3. Create First Admin
        const admin = new Admin({
            username: "admin_ruchi",
            password: "SecurePassword123" // The Model will hash this automatically
        });
        await admin.save();
        console.log("✅ Admin account created: admin_ruchi");

        // 4. Create Initial Workshops
        const workshops = [
            {
                title: "4-Week Digital Business Workshop",
                slug: "4-week-digital-business",
                description: "Build your digital systems from scratch with 1:1 guidance.",
                price: 499,
                label: "Workshop 01",
                status: "active",
                points: ["Live Zoom Sessions", "Certification", "Lifetime Access"],
                availableDates: [new Date("2025-12-25"), new Date("2025-12-30")]
            },
            {
                title: "1:1 Mentorship Program",
                slug: "one-on-one-mentorship",
                description: "Personalized strategy sessions for entrepreneurs.",
                price: 1999,
                label: "Workshop 02",
                status: "soon",
                points: ["Private Coaching", "Business Audit", "Strategy Map"],
                availableDates: []
            }
        ];

        await Workshop.insertMany(workshops);
        console.log("✅ Sample workshops added to database");

        console.log("Seeding complete! You can now log in.");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
