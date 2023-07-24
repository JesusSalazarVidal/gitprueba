/*
 * autor: Jesus Salazar
 * Julio 24, 2023
 */

//Requerimos o importamos los modulos que se utilizaran
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
//importamos los archivos de rutas para cada modelo
const usuarioRoutes = require('./routes/usuario');
const egresoRoutes = require('./routes/egreso');
const productoRoutes = require('./routes/producto');
const ventaRoutes = require('./routes/venta');
const ingresoRoutes = require('./routes/ingreso');


//routes
app.get('/', (req, res) => {
    res.send("Home")
})
app.use('/', usuarioRoutes);
app.use('/', egresoRoutes);
app.use('/', productoRoutes);
app.use('/', ventaRoutes);
app.use('/', ingresoRoutes);

//conexion a MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Conexion exitosa")).catch((error) => console.error(error));

app.listen(port, () => console.log("Servidor en el puerto", port));