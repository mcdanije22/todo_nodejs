const getList = (req, res, db )=>{
    // res.send(db);

    db.select('*').from('items').then(items=>{
        res.json(items)       
   
    //joins
    // db.from('items').leftJoin('users', 'items.owner', 'users.name').then(items=>{
    //     res.json(items);
    })

    // db.select('*')
    // .from('users')
    // .then(user=>{
    //     res.json(user)
    // })

    .catch(err=>console.log(err))  



    // db.transaction(trx=>{
    //    trx.from('items').leftJoin('users', 'items.owner', 'users.name')
    //    .returning('*')
    //    .then(users=>{
    //        return trx.select('*')
    //        .from('users')
    //    })
    //    .then(test =>{
    //        res.json(test)
    //    })
    //    .then(trx.commit)
    //    .catch(trx.rollback)
    // })

}

module.exports = {
    getList
}