/**
 * Autores: Jesus Salazar, Diana Melina Lara
 * Julio 26, 2023
 */

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de usuarios
const usuarioSchema = mongoose.Schema({
    nombreUsuario:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    nombre:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    huella:{
        type: String 
    }
});

// Crear el modelo basado en el esquema
const Usuario = mongoose.model('Userio', userSchema);

module.exports = Usuario;