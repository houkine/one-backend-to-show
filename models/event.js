/**
 * deprecated
 */

const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const event = sequelize.define('event', {
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
    content:{
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
  
module.exports = event