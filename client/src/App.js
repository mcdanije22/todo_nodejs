import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    list:[],
    itemInput:'',
    descriptionInput:'',
    ownerInput:''
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

  clearForm =()=>{
    this.setState({
      itemInput:'',
      descriptionInput:'',
      ownerInput:''
    }, ()=>{console.log('clear')})
  }
  

  onInputChange=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>{
      console.log(this.state.itemInput)
    })
  }

  onSubmit=(e)=>{
    const {itemInput, descriptionInput, ownerInput} =this.state;
    fetch('http://localhost:3000/add',{
      method:'POST',
      body:JSON.stringify({
        item:itemInput,
        description:descriptionInput,
        owner:ownerInput
      }),
      headers:{'Content-Type':'application/json'}
    })
    .then(res => res.json())
    .then(data=>{
      const newItem = data;
      const newList = [...this.state.list, ...newItem]
      console.log(newList)
      this.setState({list:newList})
    })
    this.clearForm();
  }

  onDelete=(e)=>{
    const id = e.target.id
    console.log(id)
    fetch('http://localhost:3000/delete',
    {
        method: "DELETE",
        body:JSON.stringify({
          id:id
        }),
        headers:{'Content-Type':'application/json'}
    })
  }

  render() {
    const {list} = this.state;
    const userList = list.map((item, i)=>{
      return <li key={i} style={{listStyle:'none', fontSize:'2rem'}}>{item.item} {item.id} <button type='submit' id= {item.id} style={{fontSize:'2rem', border: '1px black solid'}} onClick={this.onDelete}>delete</button></li> 
    });

    return (
      <div className="App">
      <h3>Item:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='textInput' 
      value={this.state.itemInput} 
      onChange={this.onInputChange} 
      name ='itemInput'
      />
      <h3>description:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='descriptionInput' 
      value={this.state.descriptionInput} 
      onChange={this.onInputChange} 
      name ='descriptionInput'
      />
      <h3>Assign To:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='ownerInput' 
      value={this.state.ownerInput} 
      onChange={this.onInputChange} 
      name ='ownerInput'
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
