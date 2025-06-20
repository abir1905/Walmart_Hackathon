console.log("Current directory:", __dirname);
console.log("Looking for .env at:", require('path').join(__dirname, '.env'));

require('dotenv').config();
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);