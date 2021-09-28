const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");
// const bcrypt = require('bcrypt');
const crypt = require('../utils/crypt')

const record = sequelize.define('record', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    date:{
        type: DataTypes.DATEONLY,
        defaultValue:Sequelize.NOW,
    },
    journey:{
        type: DataTypes.STRING,
        defaultValue:'Preconception',
    },
    // ---------------------------------------- daily intake
    Kilojoules:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Kilojoules_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    // Macros
    Carbs:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Carbs_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Fats:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Fats_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Proteins:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Proteins_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Fibre:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Fibre_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    // Vitamins
    Folate:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Folate_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    VitaminB12:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    VitaminB12_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    VitaminB6:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    VitaminB6_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Omega3:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Omega3_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    // Minerals
    Iron:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Iron_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Calcium:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Calcium_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Iodine:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Iodine_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Zinc:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Zinc_target:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },

    // ---------------------------------------- meals
    // burger:1000kj#queen apple:100kj
    Breakfast:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    // if breakfast contains favourite stuff. if it is, they cannot be favourited again. 
    // "favurite food cannot be favourited again" ref:hamish
    Breakfast_favourited:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    // default is not eated
    Breakfast_eated:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Lunch:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Lunch_favourited:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Lunch_eated:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Dinner:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Dinner_favourited:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Dinner_eated:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Snacks:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Snacks_favourited:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Snacks_eated:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Vitamins:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Vitamins_favourited:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    Vitamins_eated:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    // ----------------------------------------- other daily stuff
    // 10:00,left#15:00,right
    Breastfeeding:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    water:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    VitaminD:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    WetNappy:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // ----------------------------------------- status
    weight:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    stpes:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // standing should call react-native-health - AppleHealthKit.getAppleStandTime
    standing:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    Glucose:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    NutritionalIntake:{
        type: DataTypes.FLOAT,
        defaultValue:0,
    },
    Breastfeeding_times:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // -----------------------------------------reserve segment
    reserve:{
        type: DataTypes.STRING,
        defaultValue:'',
    },

}, {
    freezeTableName: true,
});
  
module.exports = record

/**
 * @typedef Record
 * @property {UUID} id
 * @property {date} date - '2000-01-01'
 * @property {string} journey
 * @property {number} Kilojoules
 * @property {number} Kilojoules_target
 * @property {number} Carbs
 * @property {number} Carbs_target
 * @property {number} Fats
 * @property {number} Fats_target
 * @property {number} Proteins
 * @property {number} Proteins_target
 * @property {number} Fibre
 * @property {number} Fibre_target 
 * @property {number} Folate
 * @property {number} Folate_target
 * @property {number} VitaminB12
 * @property {number} VitaminB12_target
 * @property {number} VitaminB6
 * @property {number} VitaminB6_target
 * @property {number} Omega3
 * @property {number} Omega3_target
 * @property {number} Iron
 * @property {number} Iron_target
 * @property {number} Calcium
 * @property {number} Calcium_target
 * @property {number} Iodine
 * @property {number} Iodine_target
 * @property {number} Zinc
 * @property {number} Zinc_target
 * @property {string} Breakfast
 * @property {boolean} Breakfast_favourited
 * @property {boolean} Breakfast_eated
 * @property {string} Lunch
 * @property {boolean} Lunch_favourited
 * @property {boolean} Lunch_eated 
 * @property {string} Dinner
 * @property {boolean} Dinner_favourited
 * @property {boolean} Dinner_eated
 * @property {string} Snacks
 * @property {boolean} Snacks_favourited
 * @property {boolean} Snacks_eated
 * @property {string} Vitamins
 * @property {boolean} Vitamins_favourited
 * @property {boolean} Vitamins_eated
 * @property {string} Breastfeeding
 * @property {integer} water
 * @property {number} VitaminD
 * @property {integer} WetNappy
 * @property {number} weight
 * @property {integer} stpes
 * @property {string} standing
 * @property {number} Glucose
 * @property {number} NutritionalIntake
 * @property {integer} Breastfeeding_times
 * @property {string} reserve
 */