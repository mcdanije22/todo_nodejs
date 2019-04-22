const deleteItem= (req,res,db)=>{
    const {id} = req.body;
    db('items')
    .where({id:id})
    .del()
    .then(res.json())
}

module.exports={
    deleteItem
}