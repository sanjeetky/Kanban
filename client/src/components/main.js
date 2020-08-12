import React, { Component } from 'react';
import Header from './header.js';
import Timer from 'react-compound-timer';
import { 
  Button,Navbar,FormControl } from 'react-bootstrap';
  import {  NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Modal, ModalHeader, ModalBody,
    Form, FormGroup, Col,Row,Input, Label,Image,View } from 'reactstrap';
   import { Control, LocalForm, Errors } from 'react-redux-form';
   import Select from 'react-select';
import { unstable_batchedUpdates } from 'react-dom';
   const required = (val) => val && val.length;
   const maxLength = (len) => (val) => !(val) || (val.length <= len);
   const minLength = (len) => (val) => val && (val.length >= len);
  const  options=[
    {value:"todo", label:"todo"},
    {value:"dotoday", label:"dotoday"},
    {value:"inprogress", label:"inprogress"},
    {value:"done", label:"done"}
   ];
class Main extends Component {
    constructor(props){
        super(props);
       // this.handleChange=this.handleChange.bind(this);
        this.todos=this.todos.bind(this);
        this.dotodays=this.dotodays.bind(this);
        this.tsubmit=this.tsubmit.bind(this);
        this.inp=this.inp.bind(this);
        this.inps=this.inps.bind(this);
        this.dones=this.dones.bind(this);
        this.dsubmit=this.dsubmit.bind(this);
        this.todosubmit=this.todosubmit.bind(this);
        this.dikhao=this.dikhao.bind(this);
        this.dukan=this.dukan.bind(this);
        this.hatao=this.hatao.bind(this);
        this.Update=this.Update.bind(this);
       this.starttime=this.starttime.bind(this);
       this.endtime=this.endtime.bind(this);
       this.report=this.report.bind(this);
        this.state={
          todo:false,
          dotoday:false,
          inprogress:false,
          done:false,
          user:' ',
          tasks:[],
          kholo:false,
        active:{},
        selectedOption: null,
        opted:null
        }
    }

    handleChange = selectedOption => {
     this.setState({ selectedOption:selectedOption });
     this.setState({opted:selectedOption.value},()=>
     {
       console.log(this.state.opted)
     })
    
    };

    componentDidMount()
    {
      
      fetch('/users/session')
      .then(res=>res.json())
      .then(data=>
        {
         this.setState({user:data.username})
         fetch('/tasks/load',{
          method:"POST",
          headers:{'content-Type':'application/json'},
          body:JSON.stringify({username:data.username})
        })
        .then(res=>res.json())
        .then(data=>{
          this.setState({tasks:data})
        })
        .catch(err=>console.log(err));
        })
      .catch(err=>console.log(err));
    }

todos()
{
   this.setState({todo:!this.state.todo})
}
dotodays()
{
  this.setState({dotoday:!this.state.dotoday})
}
inp()
{
  this.setState({inprogress:!this.state.inprogress})
}
dones()
{
  this.setState({done:!this.state.done})
}
dikhao()
{
  this.setState({kholo:!this.state.kholo})
}
dukan(item)
{
 this.setState({active:(item)});
 
 this.dikhao();
}
report(id)
{
  if(this.state.active.eyear==0)
  alert("Please Submit to see the result");
  else{
     var st=this.state.active.sec+(this.state.active.min)*60+(this.state.active.hours)*3600+(this.state.active.day)*24*3600+(this.state.active.month)*30*24*3600+(this.state.active.year)*365*30*24*3600;
     var et=this.state.active.esec+(this.state.active.emin)*60+(this.state.active.ehours)*3600+(this.state.active.eday)*24*3600+(this.state.active.emonth)*30*24*3600+(this.state.active.eyear)*365*30*24*3600;
     var tt=(et-st);
     if(tt<0)
     alert("please reset time")
     else
     {
     var time=this.state.active.time;
     alert("efficiency:"+ (time/tt)*100+"%");
     }
  }
}
endtime(id)
{
  const d=new Date();
  var year=d.getFullYear();
  var month=d.getMonth();
  var day=d.getDate();
  var hours=d.getHours();
  var min=d.getMinutes();
  var sec=d.getSeconds();
 const ob={
   id:id,
   sec:sec,
   min:min,
   hours:hours,
   day:day,
   month:month,
   year:year
 }
 fetch('/tasks/etime',{
  method:'PUT',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(ob)
})
.then(res=>res.json())
.then(data=>{
 console.log(data)
  window.location.reload(false);
})
.catch(err=>console.log(err))
}

starttime(id)
{
  const d=new Date();
  var year=d.getFullYear();
  var month=d.getMonth();
  var day=d.getDate();
  var hours=d.getHours();
  var min=d.getMinutes();
  var sec=d.getSeconds();
 const ob={
   id:id,
   sec:sec,
   min:min,
   hours:hours,
   day:day,
   month:month,
   year:year
 }
 fetch('/tasks/stime',{
  method:'PUT',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(ob)
})
.then(res=>res.json())
.then(data=>{
 console.log(data)
  window.location.reload(false);
})
.catch(err=>console.log(err))
   
}

hatao(id)
{
 fetch('/tasks',{
   method:'DELETE',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({id:id})
 })
 .then(res=>res.json())
 .then(data=>{
   console.log(data)
   window.location.reload(false);
 })
 .catch(err=>console.log(err))
}

Update(id)
{
  const obj={
    id:id,
    opted:this.state.opted
  }
  fetch('/tasks',{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(obj)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    window.location.reload(false);
  })
  .catch(err=>console.log(err))
}
todosubmit(values)
{
  if(this.state.user==' ')
  {
    alert("please login first");
  }
  else{
       
       var item={
         taskname:values.taskname,
         username:this.state.user
       }
       fetch('/tasks/search',{
        method:"POST",
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(item)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.length==0)
        {
          
     var task={
      description:values.description,
      taskname:values.taskname,
      status:"todo",
      username:this.state.user,
      time:values.time
    }
     fetch('/tasks',{
       method:"POST",
       headers:{'content-Type':'application/json'},
       body:JSON.stringify(task)
     })
 .then(res=>res.json())
 .then(data=>{
   alert("successfully added")
   window.location.reload(false);
 })
 .catch(err=>console.log(err));
      
        }
        else{
          alert('this taskname already exist');
        }
      })
      .catch(err=>console.log(err));
}

}

//today
tsubmit(values)
{
  if(this.state.user==' ')
  {
    alert("please login first");
  }
  else{
       
       var item={
         taskname:values.taskname,
         username:this.state.user
       }
       fetch('/tasks/search',{
        method:"POST",
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(item)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.length==0)
        {
          
     var task={
      description:values.description,
      taskname:values.taskname,
      status:"dotoday",
      username:this.state.user,
      time:values.time
    }
     fetch('/tasks',{
       method:"POST",
       headers:{'content-Type':'application/json'},
       body:JSON.stringify(task)
     })
 .then(res=>res.json())
 .then(data=>{
   alert("successfully added")
   window.location.reload(false);
 })
 .catch(err=>console.log(err));
      
        }
        else{
          alert('this taskname already exist');
        }
      })
      .catch(err=>console.log(err));
}

}
//inprogress

inps(values)
{
  if(this.state.user==' ')
  {
    alert("please login first");
  }
  else{
       
       var item={
         taskname:values.taskname,
         username:this.state.user
       }
       fetch('/tasks/search',{
        method:"POST",
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(item)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.length==0)
        {
          
     var task={
      description:values.description,
      taskname:values.taskname,
      status:"inprogress",
      username:this.state.user,
      time:values.time
    }
     fetch('/tasks',{
       method:"POST",
       headers:{'content-Type':'application/json'},
       body:JSON.stringify(task)
     })
 .then(res=>res.json())
 .then(data=>{
   alert("successfully added")
   window.location.reload(false);
 })
 .catch(err=>console.log(err));
      
        }
        else{
          alert('this taskname already exist');
        }
      })
      .catch(err=>console.log(err));
}

}
//done
dsubmit(values)
{
  if(this.state.user==' ')
  {
    alert("please login first");
  }
  else{
       
       var item={
         taskname:values.taskname,
         username:this.state.user
       }
       fetch('/tasks/search',{
        method:"POST",
        headers:{'content-Type':'application/json'},
        body:JSON.stringify(item)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.length==0)
        {
          
     var task={
      description:values.description,
      taskname:values.taskname,
      status:"done",
      username:this.state.user,
      time:values.time
    }
     fetch('/tasks',{
       method:"POST",
       headers:{'content-Type':'application/json'},
       body:JSON.stringify(task)
     })
 .then(res=>res.json())
 .then(data=>{
   alert("successfully added")
   window.location.reload(false);
 })
 .catch(err=>console.log(err));
      
        }
        else{
          alert('this taskname already exist');
        }
      })
      .catch(err=>console.log(err));
}

}

  render()
  {
    const todotask=this.state.tasks.filter((item)=>item.status=='todo');
    const todotasks=todotask.map((item)=>{
      return(
        
        <div className="item" onClick={()=>this.dukan(item)}>
          <p style={{paddingLeft:"2px",margin:"0px"}}>{item.taskname}</p>
          <svg class="svg-icon clock" viewBox="0 0 20 20" >
							<path d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412"></path>
						</svg>
            <p style={{display:"inline-block"}}>{item.time}sec</p>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
						</svg>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
						</svg>
        </div>
      )
    })
    const dotodaytask=this.state.tasks.filter((item)=>item.status=='dotoday');
    const dotodaytasks=dotodaytask.map((item)=>{
      return(
        <div className="item" onClick={()=>this.dukan(item)}>
          <p style={{paddingLeft:"2px",margin:"0px"}}>{item.taskname}</p>
          <svg class="svg-icon clock" viewBox="0 0 20 20" >
							<path d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412"></path>
						</svg>
            <p style={{display:"inline-block"}}>{item.time}sec</p>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
						</svg>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
						</svg>
        </div>
      )
    })
    const inprogresstask=this.state.tasks.filter((item)=>item.status=='inprogress');
    const inprogresstasks=inprogresstask.map((item)=>{
      return(
        <div className="item" onClick={()=>this.dukan(item)}>
          <p style={{paddingLeft:"2px",margin:"0px"}}>{item.taskname}</p>
          <svg class="svg-icon clock" viewBox="0 0 20 20" >
							<path d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412"></path>
						</svg>
            <p style={{display:"inline-block"}}>{item.time}sec</p>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
						</svg>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
						</svg>
        </div>
      )
    })
    const donetask=this.state.tasks.filter((item)=>item.status=='done');
    const donetasks=donetask.map((item)=>{
      return(
        <div className="item" onClick={()=>this.dukan(item)}>
          <p style={{paddingLeft:"2px",margin:"0px"}}>{item.taskname}</p>
          <svg class="svg-icon clock" viewBox="0 0 20 20" >
							<path d="M10.25,2.375c-4.212,0-7.625,3.413-7.625,7.625s3.413,7.625,7.625,7.625s7.625-3.413,7.625-7.625S14.462,2.375,10.25,2.375M10.651,16.811v-0.403c0-0.221-0.181-0.401-0.401-0.401s-0.401,0.181-0.401,0.401v0.403c-3.443-0.201-6.208-2.966-6.409-6.409h0.404c0.22,0,0.401-0.181,0.401-0.401S4.063,9.599,3.843,9.599H3.439C3.64,6.155,6.405,3.391,9.849,3.19v0.403c0,0.22,0.181,0.401,0.401,0.401s0.401-0.181,0.401-0.401V3.19c3.443,0.201,6.208,2.965,6.409,6.409h-0.404c-0.22,0-0.4,0.181-0.4,0.401s0.181,0.401,0.4,0.401h0.404C16.859,13.845,14.095,16.609,10.651,16.811 M12.662,12.412c-0.156,0.156-0.409,0.159-0.568,0l-2.127-2.129C9.986,10.302,9.849,10.192,9.849,10V5.184c0-0.221,0.181-0.401,0.401-0.401s0.401,0.181,0.401,0.401v4.651l2.011,2.008C12.818,12.001,12.818,12.256,12.662,12.412"></path>
						</svg>
            <p style={{display:"inline-block"}}>{item.time}sec</p>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
						</svg>
            <svg class="svg-icon clock" viewBox="0 0 20 20">
							<path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z"></path>
						</svg>
        </div>
      )
    })

    const { selectedOption } = this.state;
 
    
      return(
        <div className="main"  >
          <Header/>

         <div className="row ">
               <div className="col-3 border ">
                 <div className="hello" >
                      <h4  className="heading">To-do</h4>
                      <svg class="svg-icon add" viewBox="0 0 20 20" onClick={this.todos}>
						           	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						          </svg>
                  </div>
                  <div>
                   {todotasks}  
                  </div>   
               </div>

               <div className="col-3 border ">
                 <div className="hello" >
                      <h4  className="heading">Do-Today</h4>
                      <svg class="svg-icon add" viewBox="0 0 20 20"  onClick={this.dotodays}>
						          	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						          </svg>
                  </div>
                  
                  {dotodaytasks}
               </div>

                <div className="col-3 border ">
                  <div className="hello"  >
                      <h4  className="heading">In-progress</h4>
                      <svg class="svg-icon add" viewBox="0 0 20 20" onClick={this.inp}>
						          	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						          </svg>
                  </div>
                  {inprogresstasks}
                </div>

                <div className="col-3 border ">
                   <div className="hello"  >
                      <h4  className="heading">Done</h4>
                      <svg class="svg-icon add" viewBox="0 0 20 20" onClick={this.dones}>
						            	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
					          	</svg>
                   </div>
                   {donetasks}
                </div>
         </div>
      


<Modal isOpen={this.state.todo} toggle={this.todos} > 
<ModalHeader toggle={this.todos}>To-do</ModalHeader>
<ModalBody >
<LocalForm onSubmit={(values) => this.todosubmit(values)}>
        <Row className="form-group ">
            
                <Control.text model=".taskname" id="taskname" name="taskname"
                    placeholder="Task Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(2), maxLength: maxLength(15)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".taskname"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 1 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="description" >Description</Label>
                <Control.text model=".description" id="description" name="description"
                    placeholder="Description"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(500)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".description"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="time" >Time</Label>
                <Control.text model=".time" id="time" name="time"
                    placeholder="Target time in seconds"
                    className="form-control"
                    validators={{
                      required
                  }}
                     />
                       <Errors
                    className="text-danger"
                    model=".time"
                    show="touched"
                    messages={{
                        required: 'Required',
                    }}
                 />
        </Row>
        <Row className="form-group">
                <button type="submit" class="btn btn-primary">
              Submit
                </button>
        </Row>
    </LocalForm>
</ModalBody>
</Modal>


<Modal isOpen={this.state.dotoday} toggle={this.dotodays} > 
<ModalHeader toggle={this.dotodays}>Do-today</ModalHeader>
<ModalBody >
<LocalForm onSubmit={(values) => this.tsubmit(values)}>
        <Row className="form-group ">
            
                <Control.text model=".taskname" id="taskname" name="taskname"
                    placeholder="Task Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(2), maxLength: maxLength(15)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".taskname"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 1 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="description" >Description</Label>
                <Control.text model=".description" id="description" name="description"
                    placeholder="Description"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(500)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".description"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="time" >Time</Label>
                <Control.text model=".time" id="time" name="time"
                    placeholder="Target time in seconds"
                    className="form-control"
                    validators={{
                      required
                  }}
                     />
                       <Errors
                    className="text-danger"
                    model=".time"
                    show="touched"
                    messages={{
                        required: 'Required',
                    }}
                 />
        </Row>
        <Row className="form-group">
                <button type="submit" class="btn btn-primary">
              Submit
                </button>
        </Row>
    </LocalForm>
</ModalBody>
</Modal>



<Modal isOpen={this.state.inprogress} toggle={this.inp} > 
<ModalHeader toggle={this.inp}>Inprogress</ModalHeader>
<ModalBody >
<LocalForm onSubmit={(values) => this.inps(values)}>
        <Row className="form-group ">
            
                <Control.text model=".taskname" id="taskname" name="taskname"
                    placeholder="Task Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(2), maxLength: maxLength(15)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".taskname"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 1 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="description" >Description</Label>
                <Control.text model=".description" id="description" name="description"
                    placeholder="Description"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(500)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".description"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="time" >Time</Label>
                <Control.text model=".time" id="time" name="time"
                    placeholder="Target time in seconds"
                    className="form-control"
                    validators={{
                      required
                  }}
                     />
                       <Errors
                    className="text-danger"
                    model=".time"
                    show="touched"
                    messages={{
                        required: 'Required',
                    }}
                 />
        </Row>
        <Row className="form-group">
                <button type="submit" class="btn btn-primary">
              Submit
                </button>
        </Row>
    </LocalForm>
</ModalBody>
</Modal>



<Modal isOpen={this.state.done} toggle={this.dones} > 
<ModalHeader toggle={this.dones}>Done</ModalHeader>
<ModalBody >
<LocalForm onSubmit={(values) => this.dsubmit(values)}>
        <Row className="form-group ">
            
                <Control.text model=".taskname" id="taskname" name="taskname"
                    placeholder="Task Name"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(2), maxLength: maxLength(15)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".taskname"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 1 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="description" >Description</Label>
                <Control.text model=".description" id="description" name="description"
                    placeholder="Description"
                    className="form-control"
                    validators={{
                        required, minLength: minLength(3), maxLength: maxLength(500)
                    }}
                     />
                     <Errors
                    className="text-danger"
                    model=".description"
                    show="touched"
                    messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                 />
        </Row>
        <Row className="form-group">
            <Label htmlFor="time" >Time</Label>
                <Control.text model=".time" id="time" name="time"
                    placeholder="Target time in seconds"
                    className="form-control"
                    validators={{
                      required
                  }}
                     />
                       <Errors
                    className="text-danger"
                    model=".time"
                    show="touched"
                    messages={{
                        required: 'Required',
                    }}
                 />
        </Row>
        <Row className="form-group">
                <button type="submit" class="btn btn-primary">
              Submit
                </button>
        </Row>
    </LocalForm>
</ModalBody>
</Modal>



<Modal isOpen={this.state.kholo} toggle={this.dikhao} > 
<ModalHeader toggle={this.dikhao}>Hello Brother!!</ModalHeader>
<ModalBody >
    <p>taskname:{this.state.active.taskname}</p>
    <p>des:{JSON.stringify(this.state.active.description)}</p>
    <p>time estimate:{this.state.active.time}</p>
    <hr/>
    <p>starting time: {this.state.active.day}/{this.state.active.month}/{this.state.active.year} {this.state.active.hours}:{this.state.active.min}:{this.state.active.sec}</p>
    <p>Finishing time: {this.state.active.eday}/{this.state.active.emonth}/{this.state.active.eyear} {this.state.active.ehours}:{this.state.active.emin}:{this.state.active.esec}</p>
      <button style={{marginLeft:"5px"}} onClick={()=>this.starttime(this.state.active._id)}>Start</button>
      <button  style={{marginLeft:"5px"}} onClick={()=>this.endtime(this.state.active._id)}>Submit</button>
     
    <hr/>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
      <br/>
      <button className="btn btn-primary" style={{marginLeft:"5px"}} onClick={()=>this.Update(this.state.active._id)}>Update</button>
      <button className="btn btn-danger" style={{marginLeft:"5px"}} onClick={()=>this.hatao(this.state.active._id)}>Delete</button>
      <button className="btn btn-success" style={{marginLeft:"5px"}} onClick={()=>this.report(this.state.active._id)}>Report</button>
     
</ModalBody>
</Modal>



</div>
      )
  }
}
export default Main;
// <p>time spent:{this.state.active.ctime}</p>