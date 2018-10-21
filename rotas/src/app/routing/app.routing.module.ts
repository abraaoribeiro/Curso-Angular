import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard';
import { CursoGuard } from '../guards/cursos.guard';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { PaginaNaoEncontradaComponent } from '../pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
    {
        path: 'cursos',
        loadChildren: 'app/cursos/cursos.module#CursosModule',
        canActivate: [AuthGuard],
        canActivateChild: [CursoGuard],
        canLoad: [AuthGuard]
    },
    {
        path: 'alunos',
        loadChildren: 'app/alunos/alunos.module#AlunosModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]

        // canActivateChild: [AlunoGuard]
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
