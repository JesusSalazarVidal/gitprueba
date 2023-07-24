const express = require('express');
const Usuario = require('../models/usuario');

const router = express.Router();


//Crear usuario
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

// leer usuario
router.get('/readUsuario/:id', (req, res) =>{
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