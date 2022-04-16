const passport = require("passport");
const User = require("../schemas/user");

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: process.env.CALLBACK_URL,
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const firstName = profile.name.givenName;
//         const lastName = profile.name.familyName;
//         const profilePhoto = profile.photos[0].value;
//         const currentUser = await getUserByEmail({ email });

//         if (!currentUser) {
//           const newUser = await addGoogleUser({
//             email,
//             firstName,
//             lastName,
//             profilePhoto,
//           });
//           return done(null, newUser);
//         }
//         return done(null, currentUser);
//       } catch (error) {
//         throw new HttpException(error.message, 500);
//       }
//     }
//   )
// );


passport.use(User.createStrategy());
