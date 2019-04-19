const deleteItem= (req,res,db)=>{
    const {id} = req.params;
    db('items')
    .where({id:'71'})
    .del()
    .then(res.json())
}

module.exports={
    deleteItem
}