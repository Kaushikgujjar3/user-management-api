// var usermodel = require('../Model/usermodel');
// var jwt = require("jsonwebtoken");

// exports.user_sign_up = async (req, res) => {

//     let find_email = await usermodel.findOne({ email: req.body.email })


//     if (find_email) {
//         res.status(200).json({
//             status: "This Email is Alredy Exists"
//         })
//     }
//     else {

//         let {name , email , password} = req.body
//         let data = await usermodel.create({name , email , password});

//         res.status(200).json({
//             status: data
//         })
//     }
// }

// exports.get_data = async (req, res) => {

//     let get_data = await usermodel.find();

//     res.status(200).json({
//         status: get_data
//     })
// }

// exports.user_login = async (req, res) => {


//         let login_find = await usermodel.find({ email: req.body.email });

//         if (login_find.length == 1) {
//             if (login_find[0].password == req.body.password) {
//                 let token = await jwt.sign({ id: login_find[0].id, password: login_find[0].password }, "cdmi")
//                 loginUser = true
//                 console.log("Token : ",token)
//                 res.status(200).json({
//                     status: 'successfully Login',
//                     token
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     status: 'Check Your Password'
//                 })
//             }
//         } else {
//             res.status(200).json({
//                 status: 'You Dont have account'
//             })
//         }
   
// }









