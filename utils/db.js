const { Sequelize } = require('sequelize')

const {database,username,password,host,port,logging}  = require('../ormconfig');

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'mysql',
  logging,
});

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    // const User = require('../models/user')(sequelize);
    
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = sequelize
