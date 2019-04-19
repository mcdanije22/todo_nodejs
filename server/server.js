const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Knex = require('Knex');

const list = require('./routes/list');
const add = require('./routes/add')

const db = Knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'joshmcdaniel',
      password : '',
      database : 'todo_list'
    }
  });


const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res)=>{list.getList(req,res,db)})
app.post('/add',(req,res)=>{add.addItem(req,res,db)});

app.listen(port, ()=>console.log(`server running on port ${port}`));
