const model = require('./model');

const controllers = {
  getAll: (request, response) =>{
    /*
      #swagger.tags = ['Get']
      #swagger.description = 'Endpoint para obter todas as notas de todos alunos.'
      #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Get" }
      }
    */
    model.getAll(response);
  },
  post: (request, response) =>{
    /* 
      #swagger.tags = ['Post']
      #swagger.description = 'Endpoint para criar um atualizar Alunos e notas. 
      Note que caso os campos idAluno ou idNota estiverem preenchidos será feita uma atualização, caso contrário uma inserção.'
      #swagger.parameters['params'] = {in: 'body', schema: {
        idAluno: "1",
        idNota: "2",
        nome: "Jhon Doe",
        n1: "4",
        n2: "5",
        n3: "6",
        n4: "8"
      }}
    */
    const data = request.body;
    if(data.idAluno || data.idNota ) {
      model.updateAlunoNotas(data, response);
    }else{
      model.createAlunoNotas(data, response);
    }
  }
}

module.exports = controllers;