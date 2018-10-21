import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosDetalheComponent } from './cursos-detalhe/cursos-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosComponent } from './cursos.component';


const cursoRoutes: Routes = [
    { path: '', component: CursosComponent },
    { path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
    { path: ':id', component: CursosDetalheComponent },
  
];

@NgModule({
    imports: [RouterModule.forChild(cursoRoutes)],
    exports: [RouterModule]
})
export class CursosRoutingModule {}
