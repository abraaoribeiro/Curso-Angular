import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CampoComtrolErroComponent } from './campo-comtrol-erro/campo-comtrol-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FormDebugComponent,
    CampoComtrolErroComponent],
  exports: [
    FormDebugComponent,
    CampoComtrolErroComponent]


})
export class SharedModule { }
