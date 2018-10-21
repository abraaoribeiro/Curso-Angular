import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
curso: string [] = []
  constructor( private cursosService : CursosService) { }

  ngOnInit() {
    this.curso = this.cursosService.getCurso();
      
  }

}
