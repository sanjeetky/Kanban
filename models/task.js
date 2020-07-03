var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  Taskschema = new Schema({
    description:   {
        type: String,
       required:true
    },
    taskname:{
        type:String,
        required:true
    },
    status:{
         type:String,
         required:true
    },
    username:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        default:0
    },
    ctime:{
        type:Number,
        default:0
    }
});

var Task= mongoose.model('task', Taskschema);
module.exports =Task;