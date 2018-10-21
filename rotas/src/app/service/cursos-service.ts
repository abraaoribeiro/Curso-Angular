import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  constructor() { }

  getCursos(){
      return [
        {id:1 , name: 'Java'},
        {id:2, name: 'Angular'}
      ];
  }
  getCurso(id: number){
 
 // Pegando o Valor de nome e amostrando no CursoDetalhes html
    //  let cursos: any [] = this.getCursos();
   // cursos.forEach(curso => {
     // if(curso.id == id){
       // return curso;
     // }
      
   // });
   // return null
   
    let cursos = this.getCursos();
    for (let i = 0; i<cursos.length; i++ ){
      let curso = cursos[i];
      if(curso.id == id){
        return curso;
      }
      
    }
   return null;
  }
  
}
