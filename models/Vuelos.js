const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partidasSchema = new mongoose.Schema({
    Destino: {
    type: String,
    required: true
    },
    Aerolínea: {
    type: String,
    required: true
    },
    Vuelo: {
    type: Number,
    required: true
    },
    Horario: {
    type: Number,
    required: true
    },
    Puerta: {
    type: String,
    required: true
    },
    Confirmacion: {
    type: String,
    },
});

const Partidas = mongoose.model('Partidas', partidasSchema);

module.exports = Partidas;
