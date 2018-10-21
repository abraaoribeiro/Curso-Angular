import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { CursosService } from '../../service/cursos-service';

@Component({
  selector: 'app-cursos-detalhe',
  templateUrl: './cursos-detalhe.component.html',
  styleUrls: ['./cursos-detalhe.component.css']
})
export class CursosDetalheComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  curso: any;
  constructor(private route: ActivatedRoute,
    private service: CursosService,
    private router: Router) {
    // this.id = this.route.snapshot.params['id'];
    //console.log(this.route);
  }

  ngOnInit() {
  this.inscricao =  this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.curso = this.service.getCurso(this.id)

        // caso o curso não exista, será redirecionado para o curso-nao-encontrado 
        if (this.curso == null) {
          return this.router.navigate(['/cursos/naoEncontrado'])
        }

      }
    );

  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
 

}
