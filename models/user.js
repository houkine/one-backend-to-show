const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");
const crypt = require('../utils/crypt');
// const { now } = require("sequelize/types/lib/utils");
const moment = require('moment')

const user = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // img url
    avatar:{
        type: DataTypes.STRING(256),
        defaultValue:'',
    },
    FirstName:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    LastName:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    FavouriteFood:{
        type: DataTypes.STRING(2048),
        defaultValue:'',
    },
    // ----------------------------------------third_party login
    google_token:{
        type: DataTypes.STRING,
        defaultValue:null,
    },
    apple_token:{
        type: DataTypes.STRING,
        defaultValue:null,
    },
    auth0_token:{
        type: DataTypes.STRING,
        defaultValue:null,
    },
    // ----------------------------------------preference
    journey:{
        type: DataTypes.STRING,
        defaultValue:'Preconception',
    },
    // Health
    height:{
        type: DataTypes.FLOAT,
        defaultValue:172,
    },
    weight:{
        type: DataTypes.FLOAT,
        defaultValue:50.1,
    },
    birthday:{
        type: DataTypes.DATEONLY,
        defaultValue:'2020-12-12',
    },
    previouspregnancies:{
        type: DataTypes.STRING,
        defaultValue:'None',
    },
    knownhealthconditions:{
        type: DataTypes.STRING,
        defaultValue:'None',
    },
    knownnutritiondeficiencies:{
        type: DataTypes.STRING,
        defaultValue:'None',
    },
    wherelive:{
        type: DataTypes.STRING,
        defaultValue:'Brisbane',
    },
    // Nutrition
    focusonyourplan:{
        type: DataTypes.STRING,
        defaultValue:'Nutrition',
    },
    nutritionalknowledge:{
        type: DataTypes.STRING,
        defaultValue:'I know nothing',
    },
    bestdescribes:{
        type: DataTypes.STRING,
        defaultValue:'I have some healthy habits',
    },
    foodpreferences:{
        type: DataTypes.STRING,
        defaultValue:'I am vegan',
    },
    dietaryrestrictions:{
        type: DataTypes.STRING,
        defaultValue:'None',
    },
    howoftenhavefruit:{
        type: DataTypes.INTEGER,
        defaultValue:30,
    },

    // -----------------------------------------settings
    // database use kgs and kj to store. frontend need to convert it base on settigns
    metricsystem:{
        type: DataTypes.STRING,
        defaultValue:'kgs',
    },
    energyunits:{
        type: DataTypes.STRING,
        defaultValue:'kj',
    },
    //1x Lime#1x Avocado
    ShoppingList:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    // -----------------------------------------account status
    // account permission
    rule:{
        type: DataTypes.STRING,
        defaultValue:'user_p1',
    },
    // account status (inactivited, )
    status:{
        type: DataTypes.STRING,
        defaultValue:'active',
    },
    CurrentStreak:{
        type: DataTypes.INTEGER,
        defaultValue:1,
    },
    LongestStreak:{
        type: DataTypes.INTEGER,
        defaultValue:1,
    },
    lastLogin:{
        type: DataTypes.STRING,
        defaultValue:moment().format(),
    },
    stripe_id:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    subscribed:{
        type: DataTypes.BOOLEAN,
        defaultValue:false,
    },
    // -----------------------------------------reserve segment
    reserve:{
        type: DataTypes.STRING,
        defaultValue:'',
    },


}, {
    freezeTableName: true,
});
  
module.exports = user

/**
 * @typedef User
 * @property {UUID} id
 * @property {string} email
 * @property {string} password
 * @property {string} avatar
 * @property {string} FirstName
 * @property {string} LastName
 * @property {string} FavouriteFood
 * @property {string} google_token
 * @property {string} apple_token
 * @property {string} journey
 * @property {float} height
 * @property {float} weight
 * @property {date} birthday - '2000-01-01'
 * @property {string} previouspregnancies
 * @property {string} knownhealthconditions
 * @property {string} knownnutritiondeficiencies
 * @property {string} wherelive
 * @property {string} focusonyourplan
 * @property {string} nutritionalknowledge
 * @property {string} bestdescribes
 * @property {string} foodpreferences
 * @property {string} dietaryrestrictions
 * @property {int} howoftenhavefruit
 * @property {string} metricsystem
 * @property {string} energyunits
 * @property {string} ShoppingList
 * @property {string} rule
 * @property {string} status
 * @property {int} CurrentStreak
 * @property {int} LongestStreak
 * @property {date} lastLogin - moment().format(),
 * @property {string} stripe_id - moment().format(),
 * @property {boolean} subscribed
 * @property {string} reserve
 */