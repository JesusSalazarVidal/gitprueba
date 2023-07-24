const mongoose = require('mongoose');

const ingresoSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('Ingreso', ingresoSchema);