const Vuelos = require("../models/Vuelos");
const {validationResult}=require("express-validator");
const axios = require('axios');
const moment = require('moment');


const getPartidas = async (req, res) =>{
    try {
        const partidas = await Vuelos.find();
        res.status(200).json({ msg: "ok", partidas: partidas})
    } catch (error) {
        console.log("error en el método: " + error.message );
        res.status(500).json({ msg: "error" + error.message, partidas: null})
    }
}


const createVuelos = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
        return res.status(400).json({ msg: 'Error en la introducción de datos', error: error.errors });
        }
        
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const horaLocal = moment(response.data.datetime).format('DD-MM-YYYY-HH:mm');

        const vuelos = new Vuelos({ ...req.body, Confirmacion: horaLocal });
        await vuelos.save();

        res.status(201).json({ msg: 'ok. Vuelo creado.', vuelos: vuelos });
    } catch (error) {
        console.error('Error al crear el vuelo:', error);
        res.status(500).json({ msg: 'Error al crear el vuelo', reservas: null });
    }
};


const updateVuelos = async (req, res) => {
    try {
        const error = validationResult(req);

        if (error.isEmpty()){

        const id = req.params.id;
        await Vuelos.findByIdAndUpdate(id, req.body);
        res.status(201).json({msg: "ok. Vuelo actualizado.", vuelos: req.body});
        }else{
        res.status(400).json({ msg: 'Error en la introducción de datos', error: error.errors})
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error en la actualización del vuelo', reservas: null });
    }
};

const deleteVuelos = async (req, res) => {
    try {
        const id = req.params.id;
        const vuelos = await Vuelos.findByIdAndDelete(id);
        res.status(200).json({msg: "ok. Vuelo eliminado.", vuelos: vuelos});
    } catch (error) {
        
        res.status(500).json({ msg: 'Error en la eliminación del vuelo: ' + error.message, reservas: null });

    }
};


module.exports = {getPartidas, createVuelos, updateVuelos, deleteVuelos }