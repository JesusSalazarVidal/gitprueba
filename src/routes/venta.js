const express = require('express');
const Venta = require('../models/venta');

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

//crear venta 
router.post('/crearVenta', (req, res) =>{
    const {productos, total} = req.body;
    const fecha = getDate();

    const newVenta = new Venta({
        productos: productos,
        total: total, 
        fecha: fecha
    });

    newVenta.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//Leer venta por id
router.get('/readVenta/:id', (req, res) =>{
    const {id} = req.params;
    Venta.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//Actualizar venta
router.put('/updateVenta/:id', (req, res) => {
    const {id} = req.params;
    const {productos, total} = req.body;
    const fecha = getDate();

    Venta.updateOne({_id: id}, {$set:{productos: productos, total: total, fecha: fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//eliminar Producto
router.delete('/deleteVenta/:id', (req, res) =>{
    const{id} = req.params;
    Venta.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;