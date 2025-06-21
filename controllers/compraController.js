const db = require('../models');
const Tarjeta = db.Tarjeta;
const bcrypt = require('bcrypt');
const { decrypt } = require('./cryptoUtils');

const compareHash = (input, storedHash) => {
  return bcrypt.compareSync(input, storedHash);
};

const comprar = async (req, res) => {
  const { numero, fecha_vencimiento, CVC, precio } = req.body;

  if (!numero || !fecha_vencimiento || !CVC || !precio) {
    return res.status(400).json({ error: "Campos número, fecha de vencimiento, CVC y precio son requeridos" });
  }

  if (!/^\d{2}\/\d{2}$/.test(fecha_vencimiento)) {
    return res.status(400).json({ error: "Formato de fecha de vencimiento inválido. Debe ser MM/YY" });
  }

  try {
    const tarjetas = await Tarjeta.findAll();

    //console.log(`Buscando tarjeta con número: ${numero}`);
    //console.log(`Total de tarjetas en BD: ${tarjetas.length}`);

    let tarjeta = null;
    for (const t of tarjetas) {
      try {
        const numeroDesencriptado = decrypt(t.numero);
        //console.log(`Tarjeta ID ${t.id}: ${numeroDesencriptado} === ${numero}?`);

        if (numeroDesencriptado === numero) {
          tarjeta = t;
          break;
        }
      } catch (error) {
        console.error(`Error desencriptando tarjeta ID ${t.id}:`, error.message);
        continue;
      }
    }

    if (!tarjeta) {
      return res.status(404).json({ error: "Tarjeta no encontrada" });
    }

    if (tarjeta.fecha_vencimiento !== fecha_vencimiento) {
      return res.status(400).json({ error: "Datos incorrectos" });
    }

    const currentDate = new Date();
    const [mes, anio] = tarjeta.fecha_vencimiento.split('/');
    const fechaVencimiento = new Date(`20${anio}`, mes - 1, 1);

    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
    if (fechaVencimiento <= currentDate) {
      return res.status(400).json({ error: "La tarjeta ha vencido" });
    }

    if (!compareHash(CVC, tarjeta.CVC)) {
      return res.status(400).json({ error: "Datos incorrectos" });
    }

    if (tarjeta.cantidad_de_dinero < precio) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    tarjeta.cantidad_de_dinero -= precio;
    await tarjeta.save();

    return res.status(200).json({
      message: "Compra exitosa",
      saldo_restante: tarjeta.cantidad_de_dinero
    });
  } catch (error) {
    console.error('Error en comprar:', error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  comprar
};
