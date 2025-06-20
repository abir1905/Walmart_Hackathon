const express = require("express");
const passport = require("passport");

const router = express.Router();

// -------------------- Google Auth --------------------

// Start Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle callback and redirect to homepage on success
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login",
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
