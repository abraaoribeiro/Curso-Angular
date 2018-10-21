import { Aluno } from './../aluno';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../service/aluno.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})
export class AlunoDetalhesComponent implements OnInit {
  aluno: any
  inscricao: Subscription

  constructor(private route: ActivatedRoute,
    private alunosService: AlunoService,
    private router: Router
  ) { }

  ngOnInit() {

   /* this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
        // iniciando oum aluno como vazio
        if(this.aluno === null){
          return this.aluno = {};
        }
      }
    );
  */
 console.log("Iniciando o ngOnInit")
 //Pegando os informações do aluno atraves das rota Resolve, o atributo data pega os dados fornecidos
 this.inscricao = this.route.data.subscribe((info: {aluno: Aluno}) => {
   console.log("Recebendo o obj do Resolve");
   this.aluno = info.aluno
 })
  }

editaAluno(){
this.router.navigate(['/alunos', this.aluno.id, 'editar'])
}


  ngOnDestroy(): void {

    this.inscricao.unsubscribe();
  }
}
