const Aluno = require('./repository/alunos');
const Notas = require('./repository/notas');

class Model {
  async getAll(response){
    try {
      const result = await Notas.findAll({
        include: [
          { model:  Aluno}
        ],
        raw: true,
        nest: true,
      });
      const resultado = result.map((aluno) => {
        const media = (aluno.n1 + aluno.n2 + aluno.n3 + aluno.n4)/4;
        aluno.media = media;
        if(media>=6){
          aluno.status = "aprovado";
        }else if(media>=4){
          aluno.status = "recuperação";
        } else{
          aluno.status = "reprovado";
        }
        return aluno;
      });
      response.status(200);
      response.send(JSON.stringify(resultado));
      console.log(`${new Date().toLocaleString()} -> requisição get-all retornou com sucesso.`);
    } catch (error) {
      console.log(`${new Date().toLocaleString()} -> erro na requisição get-all: ${error.message}`);
      response.status(400);
      response.send({erro: error.message});
    }
  }
  async createAlunoNotas(alunoNotas, response){
    try {
      this.validateInput(alunoNotas);
      const newAluno = await Aluno.create({nome: alunoNotas.nome});
      const notasObject = {
        idAluno: newAluno.id,
        n1: alunoNotas.n1, 
        n2: alunoNotas.n2, 
        n3: alunoNotas.n3,
        n4: alunoNotas.n4
      };
      const newNotas = await Notas.create(notasObject);
      response.status(201);
      response.send(JSON.stringify({ ...alunoNotas, idAluno: newAluno.id, id: newNotas.id }));
      console.log(`${new Date().toLocaleString()} -> novo aluno criado com sucesso.`);
    } catch (error) {
      console.log(`${new Date().toLocaleString()} -> erro ao cadastrar novo aluno: ${error.message}`);
      response.status(400);
      response.send({erro: error.message});
    }
  }
  async updateAlunoNotas(aluno, response){
    try {
      const idAluno = aluno.idAluno;
      const idNota = aluno.idNota;
      if(idAluno && aluno.nome){
        this.getAlunobyId(idAluno);
        await Aluno.update(
          { nome: aluno.nome },
          { where: { id: aluno.idAluno}}
        );
      }

      if(idNota){
        const fields = ['n1','n2','n3','n4','idAluno'];
        const fieldsToUpdate = {};
        for(const field of fields){
          if(aluno[field]) {
            fieldsToUpdate[field] = aluno[field];
          }
        }
        if(!Object.values(fieldsToUpdate).length){
          throw new Error(`Nenhum campo para atualizar.`);
        }
        await Notas.update(fieldsToUpdate, {
          where: { id: idNota }
        });
      }
      console.log(`${new Date().toLocaleString()} -> aluno ou notas atualizadas com sucesso.`);
      response.status(204);
      response.end();
    } catch (error) {
      console.log(`${new Date().toLocaleString()} -> erro ao atualizar aluno ou nota: ${error.message} `);
      response.status(400);
      response.send({erro: error.message});
    }
  }
  validateInput(object){
    const fields = ['n1','n2','n3','n4'];
    if (typeof object.nome !== 'string' || object.nome.length === 0){
      throw new Error(`O campo nome está inválido`);
    }
    fields.filter( (key) => {
      if(object[key] > 10 ||  object[key] < 0 ){
        throw new Error(`Valor inválido para nota ${key}`);
      }
      return key;
    })
  }
  async getAlunobyId(id){
    const aluno = await Aluno.findOne({
      where: {
        id: id
      }
    });

    if(!aluno){
      throw new Error(`Aluno não encontrado para o id ${id}`);
    }
    return aluno;
  }
}

module.exports = new Model;
