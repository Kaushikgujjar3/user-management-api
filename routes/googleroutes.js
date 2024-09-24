const express = require('express');
const router = express();
const passport = require('passport');
const authenticate = require('../Middleware/authantication')
require('../passport');
var cors = require("cors")
router.use(cors())


const corsOptions = {
	origin: ['http://localhost:5000', 'http://localhost:3000'], // Add both client URLs
	credentials: true,
	optionsSuccessStatus: 200
  };

router.use(cors(corsOptions));


router.use(passport.initialize());
router.use(passport.session());

const userController = require('../Controller/googlecontroller');
const userdb = require('../Model/usermodel')
// const token = require('../Middleware/authantication')

router.post('/signup', userController.user_sign_up);
router.post('/login', userController.user_login );

router.get('/login/success', async (req, res) => {
    // console.log("User data:", req.user);
    if (req.user) {
        res.status(200).json({ message: "User Login", user: req.user });
    } else {
        res.status(400).json({ message: "User Not Logged In" });
    }
});

router.get("/validuser",authenticate,async(req,res)=>{
	console.log("done")
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

router.get('/logout' , async (req,res,next)=>{
	req.logOut(function(err){
		if(err){return next(err)}
		res.redirect("http://localhost:5000/")
	})
})

// Auth 
router.get('/auth/google', passport.authenticate('google', {
	scope:
		['email', 'profile']
}));

// Auth Callback 
router.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: 'http://localhost:5000/Home',
		failureRedirect: 'http://localhost:5000/'
	}));


// Success 
router.get('/success', userController.successGoogleLogin);

// failure 
router.get('/failure', userController.failureGoogleLogin);


module.exports = router;