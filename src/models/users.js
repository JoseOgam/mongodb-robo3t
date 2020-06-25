var mongoose = require("mongoose");
var validator= require("validator");

//create models
var User = mongoose.model('User', {
    name:{
        type : String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is invalid');
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error ('Age must be a positive number');
                
            }
        }
    }
    });

    module.exports = User;