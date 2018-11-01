import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormDebugComponent } from '../form-debug/form-debug.component';
import { TemplateFormComponent } from './template-form.component';
import { CampoComtrolErroComponent } from '../campo-comtrol-erro/campo-comtrol-erro.component';
import { HttpModule } from '@angular/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [],
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoComtrolErroComponent
  ],
  providers:[]
})
export class TemplateFormModule { }
