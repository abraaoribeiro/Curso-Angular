import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlunoService } from '../../service/aluno.service';
import { ActivatedRoute } from '@angular/router';
import { IFormCanDeactivate } from '../../guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {
  aluno: any;
  inscricao: Subscription;
  private mudou: boolean = false;
  constructor(
    private alunoService:AlunoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params:any) =>{
        let id = params['id']
        this.aluno = this.alunoService.getAluno(id);

        if(this.aluno.id === null){
          this.aluno = {}
        }

      }
    )

  }
  ngOnDestroy(): void {

    this.inscricao.unsubscribe();
  }
  OnInput(){
    this.mudou = true;
    console.log("mudou")
  }
  podeMudarRota(){
    if(this.mudou){
      confirm('Você tem certeza que deseja sair da Pagina ?');
    }
    return true;
  }
  podeDesativar(){
    return this.podeMudarRota();
  }


}
