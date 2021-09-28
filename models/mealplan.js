/**
 * mealplan have receips. if it's 5 weeks log, it will have 35 days
 * and it will have 35 receips for breakfast, 35 receips for lunch, and so on
 * so when a user choose a recipe, we need to set up his record to these 
 */

const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const mealplan = sequelize.define('mealplan', {
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
    itemnumber:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // days in total
    duration:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    image:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    recommand:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    //---------------------------------- content
    overview:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    includes:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    introduction:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Schedule:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    // Recipes, save the recipe id 1#2#3
    Breakfastrecipes:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    Snackrecipes:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    lunchrecipes:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    Dinnerrecipes:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    // status
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
  
module.exports = mealplan

/**
 * @typedef mealplan
 * @property {UUID} id
 * @property {string} name
 * @property {integer} itemnumber
 * @property {integer} duration
 * @property {string} image
 * @property {string} recommand
 * @property {string} overview
 * @property {string} includes
 * @property {string} introduction
 * @property {string} Schedule
 * @property {string} Breakfastrecipes
 * @property {string} Snackrecipes
 * @property {string} lunchrecipes
 * @property {string} Dinnerrecipes
 * @property {boolean} valid
 * @property {string} reserve
 */