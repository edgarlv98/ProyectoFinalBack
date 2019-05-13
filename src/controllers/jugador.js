const Jugador = require('../models/jugador')

//Traer a los jugadores
const getJugadores = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    Jugador.find({}).then(function(jugadores){
        res.send(jugadores)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Traer un solo jugador
const getJugador = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    Jugador.findById(_id).then(function(jugador){
        if(!jugador){
            return res.status(404).send()
        }
        return res.send(jugador)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

//Crear un jugador
const createJugador = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const jugador = new Jugador(req.body)
    jugador.save().then(function(){
        return res.send(jugador)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Actualizar un jugador
const updateJugador = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['equipo', 'numero', 'posicion', 'equipoID']
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Modificacion invalida, solo se puede modificar '+ allowUpdates
        })
    }
    Jugador.findByIdAndUpdate(_id, req.body).then(function(jugador){
        if(!jugador){
            return res.status(404).send()
        }
        return res.send(jugador)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Borrar un jugador
const deleteJugador = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    Jugador.findByIdAndDelete(_id).then(function(jugador){
        if(!jugador){
            return res.status(404).send()
        }
        return res.send(jugador)
    }).catch(function(error){
        res.status(505).send(error)
    })
}

module.exports = {
    getJugadores: getJugadores,
    getJugador: getJugador,
    createJugador: createJugador,
    updateJugador: updateJugador,
    deleteJugador: deleteJugador
}