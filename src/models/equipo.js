const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquipoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    titulosliga: {
        type: Number
    },
    titulosinter: {
        type: Number
    },
    fundacion: {
        type: Number,
        required: true
    },
    imagen: {
        type: String
    },
    equipoID: {
        type: String
    }
})

module.exports = mongoose.model('Equipo', EquipoSchema)