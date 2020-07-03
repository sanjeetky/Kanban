import React,{Component} from 'react';

import './App.css';
import Main from './components/main.js';
class App extends Component{
constructor(props){
  super(props);
  this.state={}
}
render(){
  return (
    <div className="App " style={{width:"100%",height:"100%"}}>
    <Main />
  </div>
  );
}
  
}

export default App;
