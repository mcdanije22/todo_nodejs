const getList = (req, res, db )=>{
    // res.send(db);
    db.select('*').from('items').then(items=>{
        // console.log(items)
        res.json(items)
    })
    .catch(err=>console.log(err))
}

module.exports = {
    getList
}