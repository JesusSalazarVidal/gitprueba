/**
 * Autores: Jesus Salazar, Diana Melina Lara 
 * Julio 26, 2023
 */

//Requerimos  express y el modelo Ingreso
const express = require('express');
const Ingreso = require('../models/ingreso');

const router = express.Router();

/**-------------Crear Ingreso------------
 * La ruta '/crearingreso' es POST que permite crear un nuevo ingreso.
 * Los datos se obtienen del cuerpo de la solicitud por medio del 'req.body'.
 * Se crea un nuevo documento "Ingreso".
 * Se gurda en base de datos mediante newIngreso.save().
 * 
 */ 
router.post('/crearIngreso', (req, res) =>{
    const {cantidad} = req.body;

    const newIngreso = new Ingreso({
        cantidad: cantidad
    });

    newIngreso.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Ingresos-----------
 *la ruta '/obtenerIngresos' es un GET que permite obtener todos los registros de ingresos
 * Se buscan los ingresos en la base de datos mediante 'Ingreso.find()'.
 * 
 */
 router.get('/obtenerIngresos', (req, res) =>{
    
    Ingreso.find().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});


/**-------------Obtener Ingreso-----------
 *la ruta '/obtenerIngreso/:id' es un GET que permite obtener el regsitro de un ingreso con un id en específico.
 * El Id se obtine de los parametros de la URL (req.params).
 * Se busca la venta en la base de datos mediante 'Ingreso.findById(id)'.
 * 
 */
router.get('/obtenerIngreso/:id', (req, res) =>{
    const {id} = req.params;
    Ingreso.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));

});

/**---------Actualizar Ingreso-----------
 * La ruta '/actualizarIngreso/:id' es un PUT que permite actualizar un ingreso con un id en específico.
 * el Id se obtine de los parametros del URL 'req.params'.
 * Los datos a actualizar se obtienen del curspo de la solicitud 'req.body'.
 * Se actualiza el resgitro utilizando Ingreso.updateOne().
 * 
 */
router.put('/actualizarIngreso/:id', (req, res) => {
    const {id} = req.params;
    const {cantidad} = req.body;
    const fecha = getDate();
    Ingreso.updateOne({_id: id}, {$set:{cantidad: cantidad, fecha:fecha}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**------------Eliminar Ingreso------------
 * La ruta '/eliminarIngreso/:id' es un DELETE que perimite eliminar un ingreso en específico por Id.
 * El Id se obtiene de los parámetros de la URL.
 * El Id se utiliza para eliminar el ingreso de la base de datos mediante Ingreso.deleteOne().
 */
router.delete('/eliminarIngreso/:id', (req, res) =>{
    const{id} = req.params;
    Ingreso.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});



module.exports = router;