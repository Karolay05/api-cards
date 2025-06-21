const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes/index');

const app = express();
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
