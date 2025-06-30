const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes/index');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://tayta-front.onrender.com',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = 4001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("No se pudo conectar con la base de datos:", error);
});
