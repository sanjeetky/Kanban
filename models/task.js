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
   hours:{
       type:Number,
       default:0
   },
   min:{
    type:Number,
    default:0
    },
    sec:{
    type:Number,
    default:0
     },
    year:{
    type:Number,
    default:0
    },
     month:{
    type:Number,
    default:0
    },
    day:{
    type:Number,
    default:0
    },
    ehours:{
        type:Number,
        default:0
    },
    emin:{
     type:Number,
     default:0
     },
     esec:{
     type:Number,
     default:0
      },
     eyear:{
     type:Number,
     default:0
     },
      emonth:{
     type:Number,
     default:0
     },
     eday:{
     type:Number,
     default:0
     }
});

var Task= mongoose.model('task', Taskschema);
module.exports =Task;