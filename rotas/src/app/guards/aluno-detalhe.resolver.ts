import { AlunoService } from './../service/aluno.service';
import { Aluno } from './../alunos/aluno';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AlunoDetalheResolver implements Resolve<Aluno> {
    constructor(private alunos: AlunoService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        let id = route.params['id'];
        return this.alunos.getAluno(id);
    }
}
