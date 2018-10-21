import { Injectable } from '@angular/core';
import { Aluno } from '../alunos/aluno';


@Injectable()
export class AlunoService {

  private alunos: Aluno[] = [
    {id: 1, nome: 'Abraão' ,email: 'abraao@gmail.com'},
    {id: 2, nome: 'Jose' ,email: 'jose@gmail.com'},
    {id: 3, nome: 'Adriana' ,email: 'adrina@gmail.com'}
  ];
  constructor() { }

  getAlunos(){
    return this.alunos;
  }
  getAluno(id: number){
    for (let i = 0; i < this.alunos.length; i++) {
      let aluno = this.alunos[i];
      if(aluno.id == id){
        return aluno;
      }      
    }

      return null;
  }

}
