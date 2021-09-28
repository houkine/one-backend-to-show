const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const favourite = sequelize.define('favourite', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    Kilojoules:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    // Bread:40g#Vegemite:25g
    Ingredients:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    // Iron:20g#Fibre:12g
    Nutrition:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },

    // -----------------------------------------reserve segment
    reserve:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
}, {
    freezeTableName: true,
});
  
module.exports = favourite

/**
 * @typedef favourite
 * @property {UUID} id
 * @property {string} name
 * @property {number} Kilojoules
 * @property {string} Ingredients
 * @property {string} Nutrition
 * @property {string} reserve
 */