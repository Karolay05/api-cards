const bcrypt = require('bcrypt');
const db = require('../models');
const Tarjeta = db.Tarjeta;
const { encrypt } = require('./cryptoUtils');

const hash = (value) => {
  return bcrypt.hashSync(value, 10);
};

const registrarTarjeta = async (req, res) => {
  const { numero, fecha_vencimiento, CVC, cantidad_de_dinero } = req.body;

  if (!numero || !fecha_vencimiento || !CVC || cantidad_de_dinero === undefined) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const numeroEncriptado = encrypt(numero);    
    const CVCHasheado = bcrypt.hashSync(CVC, 10);

    const tarjeta = await Tarjeta.create({
      numero: numeroEncriptado,
      fecha_vencimiento,
      CVC: CVCHasheado,
      cantidad_de_dinero
    });

    return res.status(201).json({ message: "Tarjeta registrada correctamente", tarjeta });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al registrar la tarjeta" });
  }
};

module.exports = {
  registrarTarjeta
};