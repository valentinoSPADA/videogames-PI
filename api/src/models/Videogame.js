const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lanzamiento: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING(1234)
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  });
};
