/**
 * Autores: Jesus Salazar, Diana Melina Lara 
 * Julio 26, 2023
 */

//Requerimos  express y el modelo venta
const express = require('express');
const Venta = require('../models/venta');
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

/**-------------Crear Venta------------
 * La ruta '/crearVenta' es POST que permite crear una nueva venta.
 * Los datos se obtienen del cuerpo de la solicitud por medio del 'req.body'.
 * Se crea un nuevo documento "Venta".
 * Se gurda en base de datos mediante newVenta.save().
 * 
 */ 
router.post('/crearVenta', async (req, res) =>{
    // Obtener los IDs de los productos incluidos en la venta desde el cuerpo de la solicitud
    const { productos } = req.body;

    // Buscar los productos en la base de datos por sus IDs
    const productosEnVenta = await Producto.find({ _id: { $in: productos } });
    
    // Calcular el total sumando los precios de los productos
    const total = productosEnVenta.reduce((acc, producto) => acc + producto.precio, 0);

    const newVenta = new Venta({
        productos: productos,
        total: total
    });

    newVenta.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Ventas-----------
 *la ruta '/obtenerVentas' es un GET que permite obtener todos los registros de ventas
 * Se buscan las ventas en la base de datos mediante 'Venta.find()'.
 * 
 */
 router.get('/obtenerVentas', async (req, res) =>{
    
    await Venta.find().populate('productos').then((data) => res.json(data)).catch((error) => res.json({message: error}));
});


/**-------------Obtener Venta-----------
 *la ruta '/obtenerVenta/:id' es un GET que permite obtener una venta con un id en específico.
 * El Id se obtine de los parametros de la URL (req.params).
 * Se busca la venta en la base de datos mediante 'Venta.findById(id)'.
 * 
 */
/*
router.get('/obtenerVenta/:id', (req, res) =>{
    const {id} = req.params;
    Venta.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});
*/
// Ruta para obtener la venta por ID
router.get('/obtenerVenta/:id', async (req, res) => {
    try {
      const venta = await Venta.findById(req.params.id).populate('productos');
      if (!venta) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
  
      res.json(venta);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener la venta', error: err });
    }
  });

/**---------Actualizar Venta-----------
 * La ruta '/actualizarVenta/:id' es un PUT que permite actualizar una venta con un id en específico.
 * el Id se obtine de los parametros del URL 'req.params'.
 * Los datos a actualizar se obtienen del cuerpo de la solicitud 'req.body'.
 * Se actualiza el resgitro utilizando Venta.updateOne().
 * 
 */
router.put('/actualizarVenta/:id', (req, res) => {
    const {id} = req.params;
    const {productos, total} = req.body;
    const fecha = getDate();

    Venta.updateOne({_id: id}, {$set:{productos: productos, total: total, fecha: fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**------------Eliminar Venta------------
 * La ruta '/eliminarVenta/:id' es un DELETE que permite eliminar una Venta en específico por Id.
 * El Id se obtiene de los parámetros de la URL.
 * El Id se utiliza para eliminar la venta de la base de datos mediante Venta.deleteOne().
 */
router.delete('/eliminarVenta/:id', (req, res) =>{
    const{id} = req.params;
    Venta.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;