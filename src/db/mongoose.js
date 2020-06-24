var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useUnifiedTopology:true, useCreateIndex:true});


var User = mongoose.model('User', {
name:{
    type : String
},
age:{
    type: Number
}
});

var person = new User({
    name: 'Ogam',
    age: 80
});
// person.save((err,user)=>{
//     if(err){
//         console.log("Error!", err);
//     }else{
//         console.log(user);
//     }
// })

person.save().then(()=>{
    console.log(person);
}).catch((err)=>{
    console.log("error!", err);
});