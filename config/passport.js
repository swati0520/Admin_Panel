import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ 
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (user) {
          // If user exists but doesn't have googleId (was registered via local), update it
          if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = 'google';
            user.profilePicture = profile.photos[0]?.value;
            user.isVerified.email = true; // Google emails are verified
            await user.save();
          }
          return done(null, user);
        }

        // If user does not exist, automatically create a new account
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          provider: 'google',
          profilePicture: profile.photos[0]?.value,
          isVerified: { email: true, phone: false }
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Passport serialize/deserialize (though we use JWT, Passport might still want these if session is used temporarily)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
