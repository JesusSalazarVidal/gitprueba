/**
 * Autores: Jesus Salazar, Diana Melina Lara 
 * Julio 26, 2023
 */

//Requerimos  express y el modelo usuario
const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();



/** Crear Usuario
 * Creamos la ruta '/crearUsuario'
 * Es un POST que permite crear un nuevo usuario.
 * Los datos del usuario se obtienen del cuerpo de la solicitud (req.body) y se utilizan para crear un nuevo documento "Usuario" que se guarda en la base de datos mediante newUsuario.save().
 */
router.post('/crearUsuario', (req, res) =>{
    const {nombreUsuario, nombre, password, huella}= req.body;
    const newUsuario = new Usuario({
        nombreUsuario: nombreUsuario,
        nombre: nombre,
        password: password,
        huella: huella
      });
    newUsuario.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**-------------Obtener Usuarios-----------
 *la ruta '/obtenerVentas' es un GET que permite obtener todos los registros de usuarios
 * Se buscan los usuarios en la base de datos mediante 'Usuario.find()'.
 * 
 */
 router.get('/obtenerUsuarios', (req, res) =>{
    
    Usuario.find().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**Leer Usuario por id
 * La ruta 'obtenerUsuario/:id'es un GET que permite leer un usuario en especifico por su Id.
 * El Id se obtine de los parametros de la URL (req.paramas) y se utiliza para buscar el usuario en la base de datos mediante 'Usuario.findById(id)'
 */
router.get('/obtenerUsuario/:id', (req, res) =>{
    const{id} = req.params;
    Usuario.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**Actualizar Usuario
 * La ruta '/actualizarUsuario/:id' es un PUT que permite actualizar un usuario específico por su ID. 
 * El id se obtine de los parametros URL y los datos a actualizar se obtienen del cuerpo de la solicitud con el 'req.body' y la actualizacion utilizando 'Usuario.updateOne()'
 * 
 */
router.put('/actualizarUsuario/:id', (req, res) =>{
    const{id} = req.params;
    const {nombreUsuario, nombre, password, huella} = req.body;
    Usuario.updateOne({ _id: id }, { $set: {nombreUsuario, nombre, password, huella } }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**Obtener usuario por nombre de usuario
 * La ruta '/obtenerUsuarioByNombreUsuario/:nombreUsuario' es un GET que permite buscar un usuario por su nombre de usuario. 
 *  El nombre de usuario se obtiene de los parámetros de la URL y se utiliza para buscar el usuario en la base de datos mediante Usuario.findOne().
 */
router.get('/obtenerUsuarioByNombreUsuario/:nombreUsuario', (req, res) =>{
    const nombre = req.params.nombreUsuario;
    Usuario.findOne({nombreUsuario: nombre}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

/**Eliminar Usuario
 * La ruta '/eliminarUsuario/:id' es un DELETE que permite eliminar un usuario específico por su ID. El ID se obtiene de los parámetros de la URL y se utiliza para eliminar el usuario de la base de datos mediante Usuario.deleteOne().
 */
router.delete('/eliminarUsuario/:id', (req, res) =>{
    const{id} = req.params;
    Usuario.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});



module.exports = router;