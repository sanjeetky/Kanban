
import React, { Component } from 'react';
import { 
   Button,Navbar,FormControl } from 'react-bootstrap';
   import {  NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
      Modal, ModalHeader, ModalBody,
     Form, FormGroup, Col,Row,Input, Label,Image,View } from 'reactstrap';
    import { Control, LocalForm, Errors } from 'react-redux-form';
     const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
class Header extends Component {

    constructor(props){
        super(props);
        this.togglelogin= this.togglelogin.bind(this);
        this.togglesignup= this.togglesignup.bind(this);
        this.loginsubmit=this.loginsubmit.bind(this);
        this.signupsubmit=this.signupsubmit.bind(this);
        this.logout=this.logout.bind(this);
        this.state={
           islogin:false,
           issignup:false,
           user:{
            username:" ",
            password:" "
             }
        }
    }
    componentDidMount()
    {
      fetch('/users/session')
      .then(res=>res.json())
      .then(data=>{
      if(data.username==null)
      {
          document.getElementById("login").style.display="block";
          document.getElementById("logout").style.display="none";
          this.setState(prev=>({
          user:{
            ...prev.user,
            username:" ",
            password:" "
          }
        }))
      }
      else{
          document.getElementById("login").style.display="none";
          document.getElementById("logout").style.display="block";
          this.setState(prev=>({
           user:{
             ...prev.user,
             username:data.username,
             password:data.password
           }
         }))
      }
  })
    }
    togglelogin()
    {
        this.setState({
            islogin:!this.state.islogin
        })
    }

    togglesignup()
    {
        this.setState({
            issignup:!this.state.issignup,
            islogin:!this.state.islogin
        })
    }
    loginsubmit(values)
{
    this.togglelogin();
    var user={
        username:values.username,
        password:values.password
    }
    fetch('/users/login',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data);
      window.location.reload(false);
    })
   
    .catch(err=>console.log(err));
}

signupsubmit(values)
{ 
    this.setState({
        issignup:!this.state.issignup
    })
    
    var user={
        name:values.sname,
        username:values.susername,
        password:values.spassword
    }
  console.log(user)
    fetch('/users/signup',{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status == 'err')
      {
        alert("username already exist");
      }
      else{
        console.log(data.status);
        window.location.reload(false);
      }
       
    })
    .catch(err=>console.log(err));
}
logout()
{
    fetch('/users/logout')
    .then(res=>res.json())
    .then(data=>{
        console.log("logout")
        window.location.reload(false);
    })
    .catch(err=>console.log(err))
}

  render()
  {
      return(
         <div style={{width:"100%",height:"100%"}}>
            <Navbar  bg="primary" variant="dark">
              <Navbar.Brand href="#home">Me&Myself</Navbar.Brand>
              <Button  onClick={this.togglelogin} className="navbtn" id="login" variant="outline-light">Login</Button>
              <Button onClick={this.logout} className="navbtn" id="logout" variant="outline-light">Logout</Button>
            </Navbar>
              
            <Modal isOpen={this.state.islogin} toggle={this.togglelogin} > 
                    <ModalHeader toggle={this.togglelogin}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.loginsubmit(values)}>
                            <Row className="form-group ">
                                <Label htmlFor="username">Username</Label>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" >Password</Label>
                                    <Control.text model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".password"
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
                                      Login
                                    </button>
                            </Row>
                        </LocalForm>
                         <hr/>
                         <button onClick={this.togglesignup} class="btn btn-success">Create New Account </button>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.issignup} toggle={this.togglesignup}>
                    <ModalHeader toggle={this.togglesignup}>SignUp</ModalHeader>
                    <ModalBody>

                    <LocalForm onSubmit={(values) => this.signupsubmit(values)}>
                    <Row className="form-group ">
                                <Label htmlFor="name">Name</Label>
                                    <Control.text model=".sname" id="sname" name="sname"
                                        placeholder=" Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".sname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group ">
                                <Label htmlFor="susername">Username</Label>
                                    <Control.text model=".susername" id="susername" name="susername"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".susername"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 1 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="spassword" >Password</Label>
                                    <Control.text model=".spassword" id="spassword" name="spassword"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".spassword"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Row>
                            <Row className="form-group">
                                    <Button type="submit" color="success">
                                   Create Account
                                    </Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
           
         </div>
      )
  }
    
}
export default Header;
