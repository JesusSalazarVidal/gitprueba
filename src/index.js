const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
const UsuarioRoutes = require('./routes/usuario');
const EgresoRoutes = require('./routes/egreso');
const ProductoRoutes = require('./routes/producto');
const VentaRoutes = require('./routes/venta');
const IngresoRoutes = require('./routes/ingreso');


//routes
app.get('/', (req, res) => {
    res.send("Home")
})
app.use('/', UsuarioRoutes);
app.use('/', EgresoRoutes);
app.use('/', ProductoRoutes);
app.use('/', VentaRoutes);
app.use('/', IngresoRoutes);

//conexion a MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Conexion exitosa")).catch((error) => console.error(error));

app.listen(port, () => console.log("Servidor en el puerto", port));