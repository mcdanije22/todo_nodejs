import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    list:[],
    input:''
  }
}
  componentDidMount(){
    fetch('http://localhost:3000')
    .then(res=>res.json())
    .then((data)=>{
      this.setState({list:data}, ()=>{
        console.log(this.state.list)
      })
    })
  }

  // componentDidUpdate(){
  //   fetch('http://localhost:3000')
  //   .then(res=>res.json())
  //   .then((data)=>{
  //     this.setState({list:data}, ()=>{
  //       console.log(this.state.list)
  //     })
  //   })
  // }
  

  onInputChange=(e)=>{
    this.setState({input:e.target.value})
  }

  onSubmit=(e)=>{
    fetch('http://localhost:3000/add',{
      method:'POST',
      body:JSON.stringify({
        name:this.state.input,
        age:30
      }),
      headers:{'Content-Type':'application/json'}
    })
    .then()
  }

  render() {
    const {list} = this.state;
    const userList = list.map((user, i)=>{
      return <li key={i} style={{listStyle:'none'}}>{user.name}</li>
    });

    return (
      <div className="App">
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='textInput' 
      value={this.state.input} 
       onChange={this.onInputChange} 
      />
      <button type='submit' onClick={this.onSubmit} style={{fontSize:'2rem', backgroundColor:'red'}}>Add</button>
       <ul>
       {userList}
       </ul>
      </div>
    );
  }
}

export default App;
