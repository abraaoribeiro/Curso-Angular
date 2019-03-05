import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputFieldComponent } from './input-field/input-field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampoComtrolErroComponent } from './campo-comtrol-erro/campo-comtrol-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    FormDebugComponent,
    CampoComtrolErroComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  exports: [
    FormDebugComponent,
    CampoComtrolErroComponent,
    ErrorMsgComponent,
    InputFieldComponent
  ],
  providers: [
    DropdownService

  ]

})
export class SharedModule { }
