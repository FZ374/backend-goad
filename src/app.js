const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/anuncios', require('./routes/anuncio.routes'));

app.use('/api/vehiculos', require('./routes/vehiculo.routes'));

app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/pagos', require('./routes/pago.routes'));
app.use('/api/favoritos', require('./routes/favoritos.routes'));
app.use('/api/inmuebles', require('./routes/inmueble.routes'));
app.use('/api/empleos', require('./routes/empleo.routes'));

const path = require('path');

// Servir las imágenes desde D:/imagenes, pero manteniendo la ruta web /uploads
app.use('/uploads', express.static('D:/imagenes'));

module.exports = app;