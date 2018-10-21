import { AlunoDetalheResolver } from './../guards/aluno-detalhe.resolver';
import { AlunoGuard } from './../guards/alunos.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoDetalhesComponent } from './aluno-detalhes/aluno-detalhes.component';
import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';


const routesAlunos: Routes = [{
    path: '', component: AlunosComponent,
    canActivateChild: [AlunoGuard],
    children: [
        { path: 'novo', component: AlunoFormComponent },
        {
            path: ':id', component: AlunoDetalhesComponent,
            resolve: { aluno: AlunoDetalheResolver }
        },
        {
            path: ':id/editar', component: AlunoFormComponent,
            canDeactivate: [AlunosDeactivateGuard]
        },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routesAlunos)],
    exports: [RouterModule]
})
export class AlunosRoutingModule { }
