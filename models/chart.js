const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");
const moment = require('moment')

const chart = sequelize.define('chart', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    // healthy weight
    title:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    date:{
        type: DataTypes.DATEONLY,
        defaultValue:moment().format(),
    },
    value:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    value_validrange:{
        type: DataTypes.STRING,
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
  
module.exports = chart

/**
 * @typedef chart
 * @property {UUID} id
 * @property {string} title
 * @property {date} date
 * @property {string} value
 * @property {string} value_validrange
 * @property {boolean} valid
 * @property {string} reserve
 */