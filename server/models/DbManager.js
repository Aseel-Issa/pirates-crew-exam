const mongoose = require('mongoose')
// mongoose is a singleton, so connecting to db once is enough
mongoose.connect('mongodb://127.0.0.1/voting-dojo-app', { useNewUrlParser: true })

const User = require('../controllers/User.controller')
const Pirate = require('../controllers/pirate.controller')

const saveUser = async function(userObj){
    return User.save(userObj)
}

const getUser = async function(userObj){
    return User.find(userObj)
}

const savePirate = async function(pirateObj){
    return Pirate.save(pirateObj)
}

const getAllPirate = async function(){
    return Pirate.getAll()
}

const removePirate = async function(pirateObj){
    return Pirate.remove(pirateObj)
}

module.exports = {
    saveUser,
    getUser,
    savePirate,
    getAllPirate,
    removePirate
}
