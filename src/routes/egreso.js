const express = require('express');
const Egreso = require('../models/egreso');

const router = express.Router();

//Funcion para obtener la fecha y hora actuales.
function getDate() {
    // Obtén la fecha y hora actual en UTC
    const fechaActual = new Date();

    // Obtén el desplazamiento horario en minutos
    const offset = fechaActual.getTimezoneOffset();

    // Ajusta la fecha y hora sumando el desplazamiento horario en minutos
    const fechaLocal = new Date(fechaActual.getTime() - (offset * 60 * 1000));
    return fechaLocal;
};

//Crear Egreso
router.post('/crearEgreso', (req, res) =>{
    const {idUsuario, cantidad }= req.body;//obtenemos los datos que llegan desde req
    const fecha = getDate();

    const newEgreso = new Egreso({
        idUsuario: idUsuario,
        cantidad: cantidad,
        fecha: fecha
      });
    newEgreso.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//leer egreso por id
router.get('/readEgreso/:id', (req, res) =>{
    //obtenemos el id para realizar la busqueda.
    const {id} = req.params;
    Egreso.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//Actualizar egreso
router.put('/updateEgreso/:id', (req, res) =>{
    const{id} = req.params;
    const {idUsuario, cantidad } = req.body;
    const fecha = getDate();
    Egreso.updateOne({ _id : id}, {$set:{idUsuario, cantidad, fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//eliminar egreso
router.delete('/deleteEgreso/:id', (req, res) =>{
    const{id} = req.params;
    Egreso.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;