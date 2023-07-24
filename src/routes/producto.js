const express = require('express');
const Producto = require('../models/producto');

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


//Crear producto
router.post('/crearProducto', (req, res) =>{
    const {nombre, tipo, precio } = req.body;
    const fecha = getDate();

    const newProducto = new Producto({
        nombre: nombre,
        tipo: tipo,
        precio: precio,
        fecha: fecha
    });

    newProducto.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//Leer producto por id
router.get('/readProducto/:id', (req, res) =>{
    const {id} = req.params;
    Producto.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));

});

//Actualizar producto
router.put('/updateProducto/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, tipo, precio} = req.body;
    Producto.updateOne({_id: id}, {$set:{nombre: nombre, tipo: tipo, precio: precio}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//eliminar Producto
router.delete('/deleteProducto/:id', (req, res) =>{
    const{id} = req.params;
    Producto.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//bucar por nombre de producto
router.get('/readProductosByNombreProducto/:nombre', (req, res) =>{
    const nombre = req.params.nombre;
    Producto.findOne({nombre: nombre}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;