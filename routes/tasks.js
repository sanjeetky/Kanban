var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
var ObjectID = require('mongodb').ObjectID;
const Task=require('../models/task');
const { put } = require('./users');
router.route('/')
.post((req,res)=>{
Task.create({
   taskname:req.body.taskname,
   description:req.body.description,
   status:req.body.status,
   username:req.body.username,
   time:req.body.time
   })
   .then(item=>{
     console.log("added")
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(item)
  },err=>console.log(err))
  .catch(err=>console.log(err));
})
.delete((req,res)=>{
Task.deleteOne({_id:ObjectID(req.body.id)})
.then(item=>{
    console.log("added")
   res.statusCode=200;
   res.setHeader('Content-Type','application/json')
   res.json(item)
 },err=>console.log(err))
 .catch(err=>console.log(err));
})
.put((req,res)=>{
    Task.updateOne({_id:ObjectID(req.body.id)},{status:req.body.opted})
    .then(item=>{
        console.log("changed")
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));

});


router.route('/search')

.post((req,res)=>{
    Task.find({taskname:req.body.taskname,username:req.body.username})
    .then(item=>{
        res.statusCode=200;
        res.setHeader('content-Type','application/json')
        res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));
})


router.route('/load')

.post((req,res)=>{
    Task.find({username:req.body.username})
    .then(item=>{
        res.statusCode=200;
        res.setHeader('content-Type','application/json')
        res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));
})

router.route('/stime')
.put((req,res)=>{
    Task.updateMany({_id:ObjectID(req.body.id)},{year:req.body.year,month:req.body.month,day:req.body.day,hours:req.body.hours,min:req.body.min,sec:req.body.sec})
    .then(item=>{
        console.log("changed")
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));
})
router.route('/etime')
.put((req,res)=>{
    Task.updateMany({_id:ObjectID(req.body.id)},{eyear:req.body.year,emonth:req.body.month,eday:req.body.day,ehours:req.body.hours,emin:req.body.min,esec:req.body.sec})
    .then(item=>{
        console.log("changed")
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));
})
module.exports=router;