const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const question = sequelize.define('question', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    title:{
        type: DataTypes.STRING,
        defaultValue:'',
    },
    content:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    //1#2
    category:{
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
  
module.exports = question

/**
 * @typedef question
 * @property {UUID} id
 * @property {string} title
 * @property {string} content
 * @property {string} category
 * @property {boolean} valid
 * @property {string} reserve
 */