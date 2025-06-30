const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // ADD THIS LINE
const FacebookStrategy = require('passport-facebook').Strategy;

// Session Serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists by email
        const email = profile.emails[0].value;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // Update Google ID if missing
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;
            await existingUser.save();
          }
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          googleId: profile.id,
          email: email,
          name: profile.displayName,
          // Generate secure random password for OAuth users
          password: await bcrypt.hash(
            crypto.randomBytes(16).toString('hex'), 
            12
          )
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.error("Google authentication error:", err);
        done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ['id', 'emails', 'name', 'displayName']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(null, false, { message: "Email not provided by Facebook" });
        }

        // Check for existing user by email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // Update Facebook ID if missing
          if (!existingUser.facebookId) {
            existingUser.facebookId = profile.id;
            await existingUser.save();
          }
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          facebookId: profile.id,
          email: email,
          name: profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}`,
          password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 12)
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.error("Facebook authentication error:", err);
        done(err, null);
      }
    }
  )
);

// Local Strategy for manual login
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Invalid credentials" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);