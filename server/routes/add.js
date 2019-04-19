const addItem = (req, res, db)=>{
    const {item, description, owner} = req.body;
    db('items')
        .insert({
            item:item,
            description: description,
            owner: owner
    }).then(items=>{
        res.json(items);
    })
}

module.exports={
    addItem
}