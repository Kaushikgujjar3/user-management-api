var express = require('express');
var router = express.Router();
var userController = require('../Controller/usercontroller')
var cors = require("cors")
router.use(cors())
// var Token = require('../Middleware/authantication')

// const corsOptions = {
//   origin: 'http://localhost:5000', // Client URL
//   credentials: true, // Enable cookies and other credentials to be sent
//   optionsSuccessStatus: 200
// };

// router.use(cors(corsOptions));



// router.post('/signup', userController.user_sign_up);
// router.get('/data', userController.get_data);
// router.post('/login' , userController.user_login );


module.exports = router;
