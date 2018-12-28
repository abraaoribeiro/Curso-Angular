import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CampoComtrolErroComponent } from './campo-comtrol-erro/campo-comtrol-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { DropdownService } from './services/dropdown.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    FormDebugComponent,
    CampoComtrolErroComponent,
    ErrorMsgComponent
  ],
  exports: [
    FormDebugComponent,
    CampoComtrolErroComponent,
    ErrorMsgComponent
  ],
  providers: [
    DropdownService
  ]

})
export class SharedModule { }
