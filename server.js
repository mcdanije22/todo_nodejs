const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Knex = require('Knex');

const list = require('./routes/list');
const add = require('./routes/add');
const del = require('./routes/del');
const userList = require('./routes/userList');

// const db = Knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'joshmcdaniel',
//       password : '',
//       database : 'todo_list'
//     }
//   });

const db = Knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
    
  }
});


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/list', (req,res)=>{list.getList(req,res,db)})
app.get('/', (req,res)=>{userList.getUsers(req,res,db)})
app.post('/add',(req,res)=>{add.addItem(req,res,db)});
app.delete('/delete/:id',(req,res)=>{del.deleteItem(req,res,db)})


app.listen(port, ()=>console.log(`server running on port ${port}`));
