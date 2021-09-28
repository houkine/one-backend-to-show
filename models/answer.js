const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const answer = sequelize.define('answer', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    content:{
        type: DataTypes.STRING(1024),
        defaultValue:'',
    },
    likes_count:{
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    avatar:{
        type: DataTypes.STRING(256),
        defaultValue:'',
    },
    username:{
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
  
module.exports = answer

/**
 * @typedef answer
 * @property {UUID} id
 * @property {string} content
 * @property {integer} likes_count
 * @property {string} avatar
 * @property {string} username
 * @property {boolean} valid
 * @property {string} reserve
 */