/**
 * Autores: Jesus Salazar, Diana Melina Lara
 * Julio 26, 2023
 */

//Requerimos mongoose
const mongoose = require('mongoose');

//Definición del esquema para la colección de egresos
const egresoSchema = mongoose.Schema({
    idUsuario:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      cantidad: {
        type: Number,
        required: true
      },
      fecha: {
        type: Date,
        required: true
      }
});

// Crear el modelo basado en el esquema
const Egreso = mongoose.model('Egreso', egresoSchema);

module.exports = Egreso;