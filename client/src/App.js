import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
   Button,
   Container, 
   Row,
   Col
   } from 'reactstrap';
import { isString } from 'util';

class App extends Component {
  constructor(props){
  super(props);
  this.state={
    users:[],
    list:[],
    itemInput:'',
    descriptionInput:'',
    ownerInput:''
  }
}

  componentDidMount(){
   
    // axios.get('http://localhost:3000')
    // .then(res=>{
    //   this.setState({list:res.data},()=>{
    //     console.log(this.state.list)
    //   })
    // });

    axios.get('http://localhost:3000')
    .then(res=>{
      this.setState({users:res.data},()=>{
        console.log(this.state.users)
      })
    });

    axios.get('http://localhost:3000/list')
    .then(res=>{
      this.setState({list:res.data},()=>{
        console.log(this.state.list)
      })
    });
    
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

  onSubmit=(e)=>{
    const {itemInput, descriptionInput, ownerInput} =this.state;
    if(itemInput ==='' || descriptionInput === '' || ownerInput ===''){
      alert('input all fields')
    } else{
    axios.post('http://localhost:3000/add',{
        item:itemInput,
        description:descriptionInput,
        owner:ownerInput
    })
    .then(res=>{
      const newItem = res.data;
      const newList = [...this.state.list, ...newItem]
      console.log(newList)
      this.setState({list:newList})
    })
    .then(this.clearForm())
    } 
  }


  // onSubmit=(e)=>{
  //   const {itemInput, descriptionInput, ownerInput} =this.state;
  //   if(itemInput ==='' || descriptionInput === '' || ownerInput ===''){
  //     alert('input all fields')
  //   } else{
  //   fetch('http://localhost:3000/add',{
  //     method:'POST',
  //     body:JSON.stringify({
  //       item:itemInput,
  //       description:descriptionInput,
  //       owner:ownerInput
  //     }),
  //     headers:{'Content-Type':'application/json'}
  //   })
  //   .then(res => res.json())
  //   .then(data=>{
  //     const newItem = data;
  //     const newList = [...this.state.list, ...newItem]
  //     console.log(newList)
  //     this.setState({list:newList})
  //   })
  //   .then(this.clearForm())
  //   } 
  // }

  // onDelete=(e)=>{
  //   const id = e.target.id;
  //   console.log(id);
  //   fetch(`http://localhost:3000/delete/ ${id}`,
  //   {
  //       method: "DELETE" 
  //   })
  //   const list = this.state.list;
  //   const newList = list.filter(item => item.id != id);
  //   this.setState({list:newList})
  // }

  onDelete=(e)=>{
    const id = e.target.id;
    console.log(id);
    axios.delete(`http://localhost:3000/delete/ ${id}`) 
    const list = this.state.list;
    const newList = list.filter(item => item.id != id);
    this.setState({list:newList})
  }

  clearForm =()=>{
    this.setState({
      itemInput:'',
      descriptionInput:'',
      ownerInput:''
    })
  }
  

  onInputChange=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>{
      console.log(this.state.itemInput)
    })
  }

  filterList=(e)=>{
    const curList = this.state.list;
    const filteredList = curList.filter(item=>item.name === item.owner);
    this.setState({list:filteredList})
  }

  render() {
    // const {list} = this.state;
    // const userList = list.map((item, i)=>{
    //   return <li key={i} style={{listStyle:'none', fontSize:'2rem'}}>{item.item} {item.id}  <button type='submit' id= {item.id} style={{fontSize:'2rem', border: '1px black solid'}} onClick={this.onDelete}>delete</button></li> 
    // });


    const {users,list} =this.state;
    const userList = users.map((user,i)=>{
      return <ul key={i} name={user.name} style={{listStyle:'none', fontSize:'2rem'}}><h1>{user.name}'s Tasks:</h1>
     { list.filter((listItem)=>{
       return listItem.owner == user.name;
     })
     .map((listItem,i)=>{
     return <li key ={i}>{listItem.item}<Button id={listItem.id} onClick={this.onDelete} style={{marginLeft:'2rem'}}>Delete</Button></li>
      })  
      }
      </ul>
    })
    return (
      <Container>
      <div className="App">
      <Button color='primary' onClick = {this.filterList}>Filter List</Button>
      <Row>

      <Col sm='4'>
      <h3>Item:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='textInput' 
      value={this.state.itemInput} 
      onChange={this.onInputChange} 
      name ='itemInput'
      />
      </Col>

      <Col sm='4'>
      <h3>description:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='descriptionInput' 
      value={this.state.descriptionInput} 
      onChange={this.onInputChange} 
      name ='descriptionInput'
      />
      </Col>

      <Col sm='4'>
      <h3>Assign To:</h3>
      <input 
      style={{background:'black', color:'white', fontSize:'2rem'}} 
      type='text' 
      id='ownerInput' 
      value={this.state.ownerInput} 
      onChange={this.onInputChange} 
      name ='ownerInput'
      />
      </Col>
      </Row>
      <Button type='submit' onClick={this.onSubmit} style={{fontSize:'2rem'}} color = 'success'>Add</Button>
       {userList}
      </div>
      </Container>
    );
  }
}

export default App;
