/**
 * Autores: Jesus Salazar, Diana Melina Lara 
 * Julio 26, 2023
 */

//Requerimos  express y el modelo egreso
const express = require('express');
const Egreso = require('../models/egreso');

const router = express.Router();

//Funcion para obtener la fecha y hora actuales.


/**-------------Crear Egreso------------
 * La ruta '/crearEgreso' es POST que permite crear un nuevo egreso.
 * Los datos se obtienen del cuerpo de la solicitud por medio del 'req.body'.
 * Se crea un nuevo documento "Egreso".
 * Se gurda en base de datos mediante newEgreso.save().
 * 
 */ 
router.post('/crearEgreso', (req, res) =>{
    const {idUsuario, cantidad }= req.body;

    const newEgreso = new Egreso({
        idUsuario: idUsuario,
        cantidad: cantidad
      });
    newEgreso.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Egresos-----------
 *la ruta '/obtenerEgresos' es un GET que permite obtener todos los registros de egresos
 * Se buscan los egresos en la base de datos mediante 'Egreso.find()'.
 * 
 */
 router.get('/obtenerEgresos', async (req, res) =>{
    
    await Egreso.find().populate('idUsuario').then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Egreso-----------
 *la ruta '/obtenerEgreso/:id' es un GET que permite obtener un egreso con un id en específico.
 * El Id se obtine de los parametros de la URL (req.params).
 * Se busca la venta en la base de datos mediante 'Egreso.findById(id)'.
 * 
*/

router.get('/obtenerEgreso/:id', (req, res) =>{
    const {id} = req.params;
    Egreso.findById(id).populate('idUsuario').then((data) => res.json(data)).catch((error) => res.json({message: error}));
});


/**---------Actualizar Egreso-----------
 * La ruta '/actualizarEgreso/:id' es un PUT que permite actualizar un egreso con un id en específico.
 * el Id se obtine de los parametros del URL 'req.params'.
 * Los datos a actualizar se obtienen del cuerpo de la solicitud 'req.body'.
 * Se actualiza el resgitro utilizando Egreso.updateOne().
 * 
 */
router.put('/actualizarEgreso/:id', (req, res) =>{
    const{id} = req.params;
    const {idUsuario, cantidad } = req.body;
    const fecha = getDate();
    Egreso.updateOne({ _id : id}, {$set:{idUsuario, cantidad, fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**------------Eliminar Egreso------------
 * La ruta '/eliminarEgreso/:id' es un DELETE que permite eliminar un egreso en específico por Id.
 * El Id se obtiene de los parámetros de la URL.
 * El Id se utiliza para eliminar el egreso de la base de datos mediante Egreso.deleteOne().
 */
router.delete('/eliminarEgreso/:id', (req, res) =>{
    const{id} = req.params;
    Egreso.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

module.exports = router;