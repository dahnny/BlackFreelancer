const passport = require("passport");
const User = require("../schemas/user")


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findOne({ id });
    done(null, currentUser);
});