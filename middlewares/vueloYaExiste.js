const Vuelos = require("../models/Vuelos");


const vueloYaExiste = async (req, res, next) => {
    try {
        const vuelos = await Vuelos.findOne({Vuelo: req.body.Vuelo});
        if (vuelos){
            res.status(400).json({msg: "el numero de vuelo ya existe"})
        }else{
            next();
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error al comunicarse con la BD' + error.msg });
    }
}

module.exports = vueloYaExiste;