var mongoose = require("mongoose");

//create task model structure
var Task = mongoose.model("Task",{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
    })

    module.exports = Task;