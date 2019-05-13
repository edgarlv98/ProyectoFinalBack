const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')

//Autorizacion
const auth = function( req, res, next ) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, config.secret)
    User.findOne({ _id: decoded._id, 'tokens.token': token }).then(function(user) {
      if(!user) {
        throw new Error()
      }
      req.token = token
      req.user = user
      next()
    }).catch(function(error) {
      res.status(401).send({ error: 'Autenticate'})
    })
  } catch(e) {
    res.status(401).send({ error: 'Autenticate'})
  }
}

module.exports = auth