import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalhesComponent } from './aluno-detalhes/aluno-detalhes.component';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunoService } from '../service/aluno.service';
import { FormsModule } from '@angular/forms';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from '../guards/aluno-detalhe.resolver';

@NgModule({
    declarations: [
        AlunosComponent,
        AlunoFormComponent,
        AlunoDetalhesComponent,
    ],
    imports: [
     CommonModule,
     AlunosRoutingModule,FormsModule
    ],
    exports: [],
    providers: [AlunoService, AlunosDeactivateGuard, AlunoDetalheResolver],
})
export class AlunosModule { }