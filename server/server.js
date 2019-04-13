const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Knex = require('Knex');


const postgres = Knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'joshmcdaniel',
      password : '',
      database : 'todo_list'
    }
  });

  


  postgres.select('*').from('items').then(data=>console.log(data));

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = [
    {
        id:123,
        name:'josh',
        age: 28
    },
    {
        id:124, 
        name:'john',
        age:30
    }
]
app.get('/', (req, res )=>{
    res.send(db);
})
app.post('/add',(req, res)=>{
    const {name, age} = req.body;
    db.push({
        name:name,
        age:age
    })
})

app.listen(port, ()=>console.log(`server running on port ${port}`));
