const Sequelize = require('sequelize');
require('dotenv').config();

const instance = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,  
  {
    host: process.env.DBHOST,  
    dialect: process.env.DBDIALECT
  }
);

module.exports = instance