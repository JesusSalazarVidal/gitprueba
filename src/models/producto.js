/**
 * Autores: Jesus Salazar, Diana Melina Lara
 * Julio 26, 2023
 */

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de productos
const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

// Crear el modelo basado en el esquema
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;