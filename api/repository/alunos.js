const Sequelize = require('sequelize');
const instance = require('../../data-base');

const columns = {
  id: { 
    type: Sequelize.BIGINT, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  nome: { 
    type: Sequelize.STRING(80), 
    allowNull: false 
  }
};

const options = {
    freezeTableName: true,
    tableName: 'aluno'
}

module.exports = instance.define('aluno', columns, options);