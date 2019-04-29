const deleteItem= (req,res,db)=>{
    const {id} = req.params;
    
    db('items')
    .where({id:id})
    .del()
    .then(res.json())
}

module.exports={
    deleteItem
}