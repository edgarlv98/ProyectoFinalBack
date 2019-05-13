const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JugadorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    equipo: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    equipoID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Jugador', JugadorSchema)