require("dotenv").config({ path: require("path").join(__dirname, ".env") });

// Enhanced environment variable debugging
console.log("Current directory:", __dirname);
console.log("Environment Variables:");
console.log(`GOOGLE_MAPS_API_KEY: ${process.env.GOOGLE_MAPS_API_KEY ? '****' + process.env.GOOGLE_MAPS_API_KEY.slice(-4) : 'Not set'}`);
console.log(`RAZORPAY_KEY_ID: ${process.env.RAZORPAY_KEY_ID ? '****' + process.env.RAZORPAY_KEY_ID.slice(-4) : 'Not set'}`);
console.log(`RAZORPAY_KEY_SECRET: ${process.env.RAZORPAY_KEY_SECRET ? '****' + process.env.RAZORPAY_KEY_SECRET.slice(-4) : 'Not set'}`);
console.log(`MONGO_URI: ${process.env.MONGO_URI ? '****' + process.env.MONGO_URI.slice(-20) : 'Not set'}`);
console.log(`COOKIE_SECRET: ${process.env.COOKIE_SECRET ? '****' + process.env.COOKIE_SECRET.slice(-4) : 'Not set'}`);

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const User = require("./models/user");
require("./auth/passport");

const authRoutes = require("./Routes/auth");

const app = express();

// ---------------------- Middleware -----------------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET || "your_cookie_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------------------- MongoDB -----------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// ---------------------- Razorpay Routes -----------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  if (!amount) return res.status(400).json({ error: "Amount is required" });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay order error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Signature verification failed" });
  }
});

// ---------------------- Reverse Geocoding Endpoint -----------------------
app.get("/reverse-geocode", async (req, res) => {
  const { lat, lng } = req.query;
  
  if (!lat || !lng) {
    return res.status(400).json({ 
      message: "Latitude and longitude are required" 
    });
  }

  // API key verification
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error("❌ GOOGLE_MAPS_API_KEY is not set in environment variables");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    console.log("Geocoding API URL:", apiUrl.replace(process.env.GOOGLE_MAPS_API_KEY, '****'));
    
    const response = await axios.get(apiUrl);
    
    if (response.data.status !== 'OK') {
      let errorMessage = response.data.error_message || 'Address not found';
      console.error("❌ Geocoding API error:", errorMessage);
      return res.status(400).json({
        message: errorMessage
      });
    }
    
    res.json(response.data.results[0]);
  } catch (err) {
    console.error('❌ Reverse geocode error:', err);
    res.status(500).json({ 
      message: 'Geocoding service error',
      details: err.message
    });
  }
});

// ---------------------- Local Auth Routes -----------------------
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

// ---------------------- Google Auth Routes -----------------------
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login"
  })
);

// ---------------------- Facebook Auth Routes -----------------------
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ['email'] }));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login"
  })
);

// ---------------------- Auth Utility Routes -----------------------
app.get("/auth/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ error: "Not authenticated" });
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000/");
  });
});

// ---------------------- Start Server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});