import { NgModule } from "@angular/core";

import { CursosComponent } from "./cursos.component";
import { CursosDetalheComponent } from "./cursos-detalhe/cursos-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";
import { CursosService } from "../service/cursos-service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CursosRoutingModule } from "./cursos.routing.module";

@NgModule({
declarations:[
    CursosComponent,
    CursosDetalheComponent,
    CursoNaoEncontradoComponent,

],
imports:[
    CommonModule,
    CursosRoutingModule
  //  RouterModule
],
exports:[],
providers:[CursosService]

})
export class CursosModule{}
