const express = require('express');
const router = express.Router();
const partidasController = require("../controllers/partidas.controller");
const {check}= require("express-validator");
const vueloYaExiste = require("../middlewares/vueloYaExiste");



router.get('/', partidasController.getPartidas);

router.post('/', 
check("Destino")
    .not().isEmpty().withMessage("El campo Destino está vacío"),
check("Aerolínea")
    .not().isEmpty().withMessage("El campo Aerolínea está vacío"),
check("Vuelo")
    .not().isEmpty().withMessage("El campo vuelo está vacío")
    .isLength({ min: 4, max: 4 }).withMessage("El campo vuelo debe contener 4 numeros.")
    .isNumeric().withMessage("El campo vuelo debe contener sólo numeros."),
check("Horario")
    .not().isEmpty().withMessage("El campo Horario está vacío")
    .isLength({ min: 4, max: 4 }).withMessage("El campo horario debe contener 4 numeros.")
    .isNumeric().withMessage("El campo horario debe contener sólo numeros."),
check("Puerta")
    .not().isEmpty().withMessage("El campo Puerta está vacío")
    .matches(/^[A-Za-z]\d{1,2}$/).withMessage('El campo Puerta debe contener una letra y uno o dos números'),
vueloYaExiste,
partidasController.createVuelos);

router.put('/:id', 
check("Destino")
    .not().isEmpty().withMessage("El campo Destino está vacío"),
check("Vuelo")
    .not().isEmpty().withMessage("El campo vuelo está vacío")
    .isLength({ min: 4, max: 4 }).withMessage("El campo vuelo debe contener 4 numeros.")
    .isNumeric().withMessage("El campo vuelo debe contener sólo numeros."),


partidasController.updateVuelos);

router.delete('/:id', 
partidasController.deleteVuelos);

module.exports = router;