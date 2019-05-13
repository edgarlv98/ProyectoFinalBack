const express = require('express')
const router = express.Router()

const jugador = require('./controllers/jugador')
const equipo = require('./controllers/equipo')
const users = require('./controllers/users')
const auth = require('./middleware/auth')

//Rutas para controlador usuario
router.get('/users/:id', auth, users.getUser)
router.get('/users', auth, users.getUsers)
router.post('/users/login', users.login)
router.post('/users/logout', users.logout)
router.post('/users', users.createUser)
router.patch('/users/:id', users.updateUser)
router.delete('/users/:id', users.deleteUser)

//Rutas para controlador jugadores
router.get('/consultar/jugadores', jugador.getJugadores)
router.get('/consultar/jugadores/:id', jugador.getJugador)
router.post('/editar/jugadores', auth, jugador.createJugador)
router.patch('/editar/jugadores/:id', auth, jugador.updateJugador)
router.delete('/editar/jugadores/:id', auth, jugador.deleteJugador)

//Rutas para controlador equipos
router.get('/consultar/equipos', equipo.getEquipos)
router.get('/consultar/equipos/:id', equipo.getEquipo)
router.post('/editar/equipos', auth, equipo.createEquipo)
router.patch('/editar/equipos/:id', auth, equipo.updateEquipo)
router.delete('/editar/equipos/:id', auth, equipo.deleteEquipo)

router.get('*', function(req, res) {
    res.send({
      error: 'Esta ruta no existe'
    })
})

module.exports = router