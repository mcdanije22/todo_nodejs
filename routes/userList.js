const getUsers=(req, res, db )=>{
    db.select('*')
    .from('users')
    .then(user=>{
        res.json(user)
    })
};

module.exports={
    getUsers
}