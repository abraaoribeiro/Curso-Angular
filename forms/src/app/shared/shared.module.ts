import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampoComtrolErroComponent } from './campo-comtrol-erro/campo-comtrol-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormDebugComponent,
    CampoComtrolErroComponent],
  exports: [
    FormDebugComponent,
    CampoComtrolErroComponent]


})
export class SharedModule { }
