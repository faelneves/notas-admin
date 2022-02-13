const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const outputFile = './doc/swagger_output.json';

const endpointsFiles = ['./api/routes.js'];

const doc = {
  info: {
    version: "1.0.0",
    title: "Notas Admin",
    description: "API usada para gerenciar alunos e suas respectivas notas."
  },
  host: `localhost:${process.env.PORT}`,
  basePath: "/",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Post: {
      idAluno: "1",
      idNota: "2",
      nome: "Jhon Doe",
      n1: "4",
      n2: "5",
      n3: "6",
      n4: "8"
    },
    Get: [{
      aluno: {id: "4", nome: "Jhon Doe", createdAt: "2022-02-12T23:04:22.488Z", updatedAt: "2022-02-12T23:04:22.488Z"},
      createdAt: "2022-02-12T23:04:22.548Z",
      id: "2",
      idAluno: "4",
      media: 4,
      n1: 7,
      n2: 4,
      n3: 5,
      n4: 0,
      status: "recuperação",
      updatedAt: "2022-02-12T23:04:22.548Z"
    }]
  },
  
}
swaggerAutogen(outputFile, endpointsFiles, doc);