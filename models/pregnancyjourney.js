const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const pregnancyjourney = sequelize.define('pregnancyjourney', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    started:{
        type: DataTypes.DATE,
        defaultValue:Sequelize.NOW,
    },
    weektotal:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    weekleft:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    // date,image url#date,image url
    pictures:{
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
  
module.exports = pregnancyjourney

/**
 * @typedef pregnancyjourney
 * @property {UUID} id
 * @property {date} started
 * @property {integer} weektotal
 * @property {integer} weekleft
 * @property {string} pictures
 * @property {boolean} valid
 * @property {string} reserve
 */