import { AlunoGuard } from './guards/alunos.guard';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app.routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosService } from './service/cursos-service';
import { AuthService } from './login/auth.service';
import { AuthGuard } from './guards/auth-guard';
import { CursoGuard } from './guards/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [
    CursosService,
    AuthService,
    AuthGuard,
    CursoGuard,
    AlunoGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
