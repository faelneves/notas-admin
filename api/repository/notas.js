const Sequelize = require('sequelize');
const instance = require('../../data-base');
const aluno = require('./alunos');

const columns = {
  id: { 
    type: Sequelize.BIGINT, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  idAluno: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  n1: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  n2: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  n3: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  },
  n4: {
    type: Sequelize.INTEGER,
    defaultValue: '0'
  }
};

const options = {
    freezeTableName: true,
    tableName: 'notas'
}

const notas = instance.define('notas', columns, options);

notas.belongsTo(aluno, { foreignKey: 'idAluno' });

module.exports = notas;