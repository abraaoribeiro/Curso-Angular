import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from "./iform-candeactivate";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        console.log('guarda de desativar')
        //se a o usuario modificar o nome ele retornará true 
       // return component.podeMudarRota ? component.podeMudarRota():true;
       return component.podeDesativar();
    }
}