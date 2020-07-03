import React, { Component } from 'react';
import Header from './header.js';
import { 
  Button,Navbar,FormControl } from 'react-bootstrap';
  import {  NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
     Modal, ModalHeader, ModalBody,
    Form, FormGroup, Col,Row,Input, Label,Image,View } from 'reactstrap';
   import { Control, LocalForm, Errors } from 'react-redux-form';
   const required = (val) => val && val.length;
   const maxLength = (len) => (val) => !(val) || (val.length <= len);
   const minLength = (len) => (val) => val && (val.length >= len);
class Main extends Component {
    constructor(props){
        super(props);
        this.todos=this.todos.bind(this);
        this.todosubmit=this.todosubmit.bind(this);
        this.state={
          todo:false,
          user:' ',
          tasks:[]
        }
    }


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
      username:this.state.user
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
        <div className="item">
          <p>{item.taskname}</p>
        </div>
      )
    })
    const dotodaytask=this.state.tasks.filter((item)=>item.status=='dotoday');
    const dotodaytasks=dotodaytask.map((item)=>{
      return(
        <div>
          <p>{item.taskname}</p>
        </div>
      )
    })
    const inprogresstask=this.state.tasks.filter((item)=>item.status=='inprogress');
    const inprogresstasks=inprogresstask.map((item)=>{
      return(
        <div>
          <p>{item.taskname}</p>
        </div>
      )
    })
    const donetask=this.state.tasks.filter((item)=>item.status=='done');
    const donetasks=donetask.map((item)=>{
      return(
        <div>
          <p>{item.taskname}</p>
        </div>
      )
    })

     
    
      return(
        <div className="main"  >
          <Header/>

         <div className="row ">
               <div className="col-3 border ">
                 <div className="hello" >
                      <h4  className="heading">To-do</h4>
                      <svg class="svg-icon" viewBox="0 0 20 20" onClick={this.todos}>
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
                      <svg class="svg-icon" viewBox="0 0 20 20"  onClick={this.today}>
						          	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						          </svg>
                  </div>
                  
                  {dotodaytasks}
               </div>

                <div className="col-3 border ">
                  <div className="hello"  >
                      <h4  className="heading">In-progress</h4>
                      <svg class="svg-icon" viewBox="0 0 20 20" onClick={this.progress}>
						          	<path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
						          </svg>
                  </div>
                  {inprogresstasks}
                </div>

                <div className="col-3 border ">
                   <div className="hello"  >
                      <h4  className="heading">Done</h4>
                      <svg class="svg-icon" viewBox="0 0 20 20" onClick={this.done}>
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
                        required, minLength: minLength(3), maxLength: maxLength(15)
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
                <button type="submit" class="btn btn-primary">
              Submit
                </button>
        </Row>
    </LocalForm>
</ModalBody>
</Modal>
</div>
      )
  }
}
export default Main;