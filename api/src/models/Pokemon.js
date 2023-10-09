const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    NAME: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
        len: [3, 50]
      }
    },
    LIFE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    ATTACK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    DEFENSE: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    SPEED: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    HEIGHT: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    WEIGHT: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        min: 1,
        max: 999
      }
    },
    IMAGE: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  },{timestamps: false});
};
