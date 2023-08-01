/**
 * Autores: Jesus Salazar, Diana Melina Lara
 * Julio 26, 2023
 */

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de ingresos
const ingresoSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Crear el modelo basado en el esquema
const Ingreso = mongoose.model('Ingreso', ingresoSchema);

module.exports = Ingreso;