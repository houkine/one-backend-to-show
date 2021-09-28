/**
 * personal notification part
 * will notice user when to time is there
 * will discuss
 */

const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const notification = sequelize.define('notification', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    time:{
        type: DataTypes.DATE,
        defaultValue:Sequelize.NOW,
    },
    title:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    notes:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    repetition:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
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
  
module.exports = notification

/**
 * @typedef notification
 * @property {UUID} id
 * @property {date} time
 * @property {string} title
 * @property {string} notes
 * @property {string} repetition
 * @property {boolean} valid
 * @property {string} reserve
 */