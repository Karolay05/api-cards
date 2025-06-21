'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tarjeta = sequelize.define('Tarjeta', {
    numero: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    fecha_vencimiento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CVC: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cantidad_de_dinero: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'tarjetas',
    timestamps: false
  });

  return Tarjeta;
};
