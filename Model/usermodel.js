const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    displayName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
   
    img:{
        type:String
    }
});

module.exports = mongoose.model("UserManagement",userSchema);
