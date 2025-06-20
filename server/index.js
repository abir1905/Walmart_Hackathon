require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
require("./auth/passport"); // Google strategy

const authRoutes = require("./Routes/auth"); // ✅ Move this AFTER defining app

const app = express(); // ✅ Define app BEFORE using it

// ---------------------- Middleware -----------------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET || "your_cookie_secret",
  resave: false,
  saveUninitialized: false,
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

// ---------------------- Passport Local Strategy -----------------------
passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  const user = await User.findOne({ email });
  if (!user) return done(null, false);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return done(null, false);
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
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

// ---------------------- Local Auth Routes -----------------------
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name });
  res.status(200).json(user);
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ user: req.user });
});

// ---------------------- Google Auth Routes -----------------------
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/", // ✅ Redirect to home instead of /dashboard
    failureRedirect: "http://localhost:3000/login"
  })
);

// ---------------------- Auth Utility Routes -----------------------
app.get("/auth/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000/");
  });
});

// ---------------------- Attach Route File -----------------------
app.use("/auth", authRoutes); // ✅ Now used after defining app

// ---------------------- Start Server -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
