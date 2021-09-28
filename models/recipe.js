const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const recipe = sequelize.define('recipe', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    time:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    serves:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // breakfast/lunch....
    category:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    image:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    //---------------------------------- content
    ingredients:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    // High Iron#Easy + Fast
    tags:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    //1#2
    method:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    //1#2
    nutrition:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    //------------------------------------------- status
    valid:{
        type: DataTypes.BOOLEAN,
        defaultValue:true,
    },
    // -----------------------------------------reserve segment
    reserve:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
}, {
    freezeTableName: true,
});
  
module.exports = recipe

/**
 * @typedef recipe
 * @property {integer} id
 * @property {string} name
 * @property {string} time
 * @property {integer} serves
 * @property {string} category
 * @property {string} image
 * @property {string} ingredients
 * @property {string} tags
 * @property {string} method
 * @property {string} nutrition
 * @property {boolean} valid
 * @property {string} reserve
 */