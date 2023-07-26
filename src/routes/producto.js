/**
 * Autores: Jesus Salazar, Diana Melina Lara 
 * Julio 26, 2023
 */

//Requerimos  express y el modelo producto
const express = require('express');
const Producto = require('../models/producto');
const router = express.Router();

//Funcion para obtener la fecha y hora local
function getDate() {
    // Obtén la fecha y hora actual en UTC
    const fechaActual = new Date();

    // Obtén el desplazamiento horario en minutos
    const offset = fechaActual.getTimezoneOffset();

    // Ajusta la fecha y hora sumando el desplazamiento horario en minutos
    const fechaLocal = new Date(fechaActual.getTime() - (offset * 60 * 1000));
    return fechaLocal;
};


/**-------- Crear Producto----------
 * La ruta '/crearProducto' es POST que permite crear un nuevo producto.
 * Los datos se obtienen del cuerpo de la solicitud por medio del 'req.body'.
 * Se crea un nuevo documento "Producto".
 * Se gurda en base de datos mediante newProducto.save().
 * 
 */
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

/**-------------Obtener Productos-----------
 *la ruta '/obtenerProductos' es un GET que permite obtener todos los productos
 * Se buscan los productos en la base de datos mediante 'Producto.find()'.
 * 
 */
 router.get('/obtenerProductos', (req, res) =>{
    
    Producto.find().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Producto-----------
 *la ruta '/obtenerProducto/:id' es un GET que permite obtener un producto con un id en específico.
 * El Id se obtine de los parametros de la URL (req.params).
 * Se busca la venta en la base de datos mediante 'Producto.findById(id)'.
 * 
 */
router.get('/obtenerProducto/:id', (req, res) =>{
    const {id} = req.params;
    Producto.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));

});

/**---------Actualizar Producto-----------
 * La ruta '/actualizarProducto/:id' es un PUT que permite actualizar un producto con un id en específico.
 * el Id se obtine de los parametros del URL 'req.params'.
 * Los datos a actualizar se obtienen del curspo de la solicitud 'req.body'.
 * Se actualiza el resgitro utilizando Producto.updateOne().
 * 
 */
router.put('/actualizarProducto/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, tipo, precio} = req.body;
    Producto.updateOne({_id: id}, {$set:{nombre: nombre, tipo: tipo, precio: precio}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**------------Eliminar Producto------------
 * La ruta '/eliminarProducto/:id' es un DELETE que perimite eliminar un producto en específico utilizando el Id.
 * El Id se obtiene de los parámetros de la URL.
 * El Id se utiliza para eliminar el producto de la base de datos mediante 'Producto.deleteOne()'.
 */
router.delete('/eliminarProducto/:id', (req, res) =>{
    const{id} = req.params;
    Producto.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------Obtener usuario por nombre de usuario-----------
 * La ruta '/obtenerProductoByNombreProducto/:nombre' es un GET que permite buscar un producto mediante el nombre.
 *  El nombre se obtiene de los parámetros de la URL y se utiliza para buscar el producto en la base de datos mediante Producto.findOne().
 */
router.get('/obtenerProductosByNombreProducto/:nombre', (req, res) =>{
    const nombre = req.params.nombre;
    Producto.findOne({nombre: nombre}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;