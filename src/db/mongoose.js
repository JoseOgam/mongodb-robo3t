var mongoose = require("mongoose");
var validator= require("validator");
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useUnifiedTopology:true, useCreateIndex:true});


// var User = mongoose.model('User', {
// name:{
//     type : String,
//     required: true,
//     trim: true
// },
// email:{
//     type:String,
//     required:true,
//     trim:true,
//     lowercase:true,
//     validate(value){
//         if(!validator.isEmail(value)){
//             throw new Error ('Email is invalid');
//         }
//     }
// },
// age:{
//     type: Number,
//     default: 0,
//     validate(value){
//         if(value<0){
//             throw new Error ('Age must be a positive number');
            
//         }
//     }
// }
// });

// var person = new User({
//     name: 'Ogam',
//     age: 80
// });
// // person.save((err,user)=>{
//     if(err){
//         console.log("Error!", err);
//     }else{
//         console.log(user);
//     }
// })

// person.save().then(()=>{
//     console.log(person);
// }).catch((err)=>{
//     console.log("error!", err);
// });


//task model

// var Task = mongoose.model("Task",{
// description:{
//     type: String
// },
// completed:{
//     type: Boolean
// }
// })

// var work = new Task({
//     description: "coding at lakehub",
//     completed: false
// })

// work.save().then(()=>{
//     console.log(work);
// }).catch((err)=>{
//     console.log("Error!", err);
// });mo27017
