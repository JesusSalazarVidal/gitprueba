const express = require('express');
const Ingreso = require('../models/ingreso');

const router = express.Router();

function getDate() {
    // Obtén la fecha y hora actual en UTC
    const fechaActual = new Date();

    // Obtén el desplazamiento horario en minutos
    const offset = fechaActual.getTimezoneOffset();

    // Ajusta la fecha y hora sumando el desplazamiento horario en minutos
    const fechaLocal = new Date(fechaActual.getTime() - (offset * 60 * 1000));
    return fechaLocal;
};


//Crear Ingreso
router.post('/crearIngreso', (req, res) =>{
    const {cantidad} = req.body;
    const fecha = getDate();

    const newIngreso = new Ingreso({
        cantidad: cantidad,
        fecha: fecha
    });

    newIngreso.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//Leer Ingreso por id
router.get('/readIngreso/:id', (req, res) =>{
    const {id} = req.params;
    Ingreso.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));

});

//Actualizar Ingreso
router.put('/updateIngreso/:id', (req, res) => {
    const {id} = req.params;
    const {cantidad} = req.body;
    const fecha = getDate();
    Ingreso.updateOne({_id: id}, {$set:{cantidad: cantidad, fecha:fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//eliminar Ingreso
router.delete('/deleteIngreso/:id', (req, res) =>{
    const{id} = req.params;
    Ingreso.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});



module.exports = router;