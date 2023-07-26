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

/**Leer Usuario por id
 * La ruta 'leerUsuario/:id'es un GET que permite leer un usuario en especifico por su Id.
 * El Id se obtine de los parametros de la URL (req.paramas) y se utiliza para bucara el usuario en la base de datos mediante 'UsuariofindById(id)'
 */
router.get('/leerUsuario/:id', (req, res) =>{
    const{id} = req.params;
    Usuario.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//actualizar usuario
router.put('/updateUsuario/:id', (req, res) =>{
    const{id} = req.params;
    const {nombreUsuario, nombre, password, huella} = req.body;
    Usuario.updateOne({ _id: id }, { $set: {nombreUsuario, nombre, password, huella } }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//bucar usuario por nombre de usuario
router.get('/readUsuarioByNombreUsuario/:nombreUsuario', (req, res) =>{
    const nombre = req.params.nombreUsuario;
    Usuario.findOne({nombreUsuario: nombre}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

//eliminar usuario
router.delete('/deleteusuario/:id', (req, res) =>{
    const{id} = req.params;
    Usuario.deleteOne({ _id: id }).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});



module.exports = router;