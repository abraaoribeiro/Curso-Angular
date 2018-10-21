import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../service/aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
private alunos: any[] = []
  constructor(private alunosService: AlunoService) { }

  ngOnInit() {

    this.alunos = this.alunosService.getAlunos();
  }

  
}
