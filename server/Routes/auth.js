const express = require("express");
const passport = require("passport");

const router = express.Router();

const User = require("../models/user"); // Assuming you have a User model
const bcrypt = require("bcrypt");

// -------------------- Manual Login --------------------
router.post("/manual-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });

      return res.status(200).json({ user });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Google Auth --------------------

// Start Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle callback and redirect to homepage on success
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/?login=success",
    failureRedirect: "/auth/login/failed",
  })
);

// -------------------- Login Success --------------------
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(401).json({ success: false, message: "User not authenticated" });
  }
});

// -------------------- Login Failure --------------------
router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "Google authentication failed" });
});

// -------------------- Logout --------------------
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000/login");
  });
});

module.exports = router;
