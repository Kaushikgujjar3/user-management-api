let usermodel = require("../Model/usermodel")
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken")


const successGoogleLogin = (req, res) => {

    if (!req.user)
        res.redirect('/failure');
    // console.log(req.user);
    res.send("Welcome " + req.user.email);
}

const failureGoogleLogin = (req, res) => {
    res.send("Error");
}


// Email Singn Up / Login

const user_sign_up = async (req, res) => {

    let find_email = await usermodel.findOne({ email: req.body.email })


    if (find_email) {
        res.status(404).json({
            status: "This Email is Alredy Exists"
        })
    }
    else {

        var bcrypt_pass = await bcrypt.hash(req.body.password, 10);

        req.body.password = bcrypt_pass;

        let { displayName, email, password } = req.body

        let data = await usermodel.create({ displayName, email, password });

        res.status(200).json({
            status: data
        })
    }
}

const user_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const login_find = await usermodel.findOne({ email: email });

        if (login_find) {
            const isMatch = await bcrypt.compare(password, login_find.password);

            if (isMatch) {
                const token = await jwt.sign({ id: login_find._id}, "cdmi");
                res.status(200).json({
                    status: 'Successfully Logged In',
                    login_find,
                    token
                });
                userLoginData = login_find;
            } else {
                res.status(401).json({
                    status: 'Incorrect Password'
                });
            }
        } else {
            res.status(404).json({
                status: 'Account does not exist'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Server Error',
            error
        });
    }
};

const grtdata = async (req,res) => {
    res.render("auth")
}





module.exports = {
    successGoogleLogin,
    failureGoogleLogin,
    user_login,
    user_sign_up,
    grtdata
}