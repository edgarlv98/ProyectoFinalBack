const Equipo = require('../models/equipo')

//Traer a los equipos
const getEquipos = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    Equipo.find({}).then(function(equipos){
        res.send(equipos)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Traer un solo equipo
const getEquipo = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    Equipo.findById(_id).then(function(equipo){
        if(!equipo){
            return res.status(404).send()
        }
        return res.send(equipo)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

//Crear un equipo
const createEquipo = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const equipo = new Equipo(req.body)
    equipo.save().then(function(){
        return res.send(equipo)
    }).catch(function(error){
        return res.status(400).send(error)
    })
}

//Actualizar un equipo
const updateEquipo = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['nombre', 'titulosliga', 'titulosinter']
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Modificacion invalida, solo se puede modificar'+ allowUpdates
        })
    }
    Equipo.findByIdAndUpdate(_id, req.body).then(function(equipo){
        if(!equipo){
            return res.status(404).send()
        }
        return res.send(equipo)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

//Borrar un equipo
const deleteEquipo = function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const _id = req.params.id
    Equipo.findByIdAndDelete(_id).then(function(equipo){
        if(!equipo){
            return res.status(404).send()
        }
        return res.send(equipo)
    }).catch(function(error){
        res.status(505).send(error)
    })
}

module.exports = {
    getEquipos: getEquipos,
    getEquipo: getEquipo,
    createEquipo: createEquipo,
    updateEquipo: updateEquipo,
    deleteEquipo: deleteEquipo
}