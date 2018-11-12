import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-comtrol-erro',
  templateUrl: './campo-comtrol-erro.component.html',
  styleUrls: ['./campo-comtrol-erro.component.css']
})
export class CampoComtrolErroComponent implements OnInit {


  @Input() mostrarErro: boolean;
  @Input() msgErro: string;
  constructor() { }

  ngOnInit() {
  }

}
