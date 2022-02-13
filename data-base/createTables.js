const AlunosTable = require('../api/repository/alunos');
const NotasTable = require('../api/repository/notas');

AlunosTable.sync()
  .then(() => {
    console.log("tabela alunos criada com sucesso!");
    NotasTable.sync().then(() => console.log("tabela notas criada com sucesso!")).catch(console.log);
  })
  .catch(console.log);
