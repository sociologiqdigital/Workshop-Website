export const startPayment = ({ setLoading }) => {
  if (typeof window === "undefined") return;

  if (!window.Razorpay) {
    alert("Payment system is unavailable. Please try again later.");
    return;
  }

  setLoading(true);

  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: 499900,
    currency: "INR",
    name: "Digital Biz Kickstarter",
    description: "30-Day Digital Business Workshop",
    image: "/logo.png",
    handler: function (response) {
      alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
      setLoading(false);
    },
    prefill: {
      name: "User Name",
      email: "user@example.com",
      contact: "9999999999",
    },
    theme: { color: "#F05A6B" },
    modal: {
      ondismiss: function () {
        setLoading(false);
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", function () {
    setLoading(false);
  });
  rzp.open();
};
