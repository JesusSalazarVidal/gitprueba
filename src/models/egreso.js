const mongoose = require('mongoose');

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
});module.exports = mongoose.model('Egreso', egresoSchema);