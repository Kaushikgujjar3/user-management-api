const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const userdb = require('./Model/usermodel')


passport.serializeUser((user, done) => {
	done(null, user);
})
passport.deserializeUser(function (user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID, 
	clientSecret: process.env.CLIENT_SECRET,  
	cookie: { secure: false },
	callbackURL: "https://user-management-api-ok62.onrender.com/auth/google/callback",
	passReqToCallback: true,
	scope:
		['email', 'profile']
},
	async (request, accessToken, refreshToken, profile, done) => {
		
		// console.log("USER PROFILE : ", profile);
	
		try {

			let user = await userdb.findOne({ googleId: profile.id })

			if (!user) {
				user = new userdb({
					googleId: profile.id,
					displayName: profile.displayName,
					email: profile.emails[0].value,
					img: profile.photos[0].value
				});

				await user.save();

			}
			return done(null, user);

		} catch (error) {
			return done(error, null)
		}

	}
));
