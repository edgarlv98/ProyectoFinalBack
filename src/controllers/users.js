const User = require('../models/user')

//Traer usuarios
const getUsers = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  User.find({}).then(function(users) {
    res.send(users)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

//Traer un solo usuario
const getUser = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const _id = req.params.id
  User.findById(_id).then(function(user) {
    if(!user){
      return res.status(404).send()
    }
    return res.send(user)
  }).catch(function(error) {
    return res.status(500).send(error)
  })
}

//Crear un usuario
const createUser = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  const user = new User(req.body)
  user.save().then(function() {
    return res.send(user)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

//Login usuario
const login = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token})
    }).catch(function(error){
      return res.status(401).send({ error: error })
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error })
  })
}

//Logout usuario
const logout = function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  req.user.tokens = req.user.tokens.filter(function(token){
    return token.token != req.token
  })
  req.user.save().then(function(){
    return res.send()
  }).catch(function(error){
    return res.status(500).send({error: error})
  })
}

//Actualizar info de usuario
const updateUser = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'password', 'email']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  User.findByIdAndUpdate(_id, req.body ).then(function(user) {
    if (!user) {
      return res.status(404).send()
    }
    return res.send(user)
  }).catch(function(error) {
    res.status(500).send(error)
  })
}

//Borrar usuario
const deleteUser = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const _id = req.params.id
  User.findByIdAndDelete(_id).then(function(user){
    if(!user) {
      return res.status(404).send()
    }
    return res.send(user)
  }).catch(function(error) {
    res.status(505).send(error)
  })
}

module.exports = {
  getUsers : getUsers,
  getUser: getUser,
  createUser : createUser,
  login: login,
  logout: logout,
  updateUser : updateUser,
  deleteUser : deleteUser
}