const deleteItem= (req,res,db)=>{
    const {id} = req.params;
    
    db('items')
    .where({id:id})
    .del()
    .then(res.json())
    // .then(console.log(id))
}

module.exports={
    deleteItem
}