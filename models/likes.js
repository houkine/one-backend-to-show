const { Sequelize,DataTypes } = require("sequelize");
const  sequelize  = require("../utils/db");

const likes = sequelize.define('likes', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
  
module.exports = likes