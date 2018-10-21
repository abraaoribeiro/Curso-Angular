import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';

@Injectable()
export class AuthService {
  private usuarioAutenticado: boolean = false
//Permite ocultar um algum template que não queremos amostrar
  public mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }


  fazerLogin(usuario: Usuario) {
    if (usuario.nome === '1' && usuario.senha === '1') {
      this.usuarioAutenticado = true

      this.mostrarMenuEmitter.emit(true);

      this.router.navigate(['/'])

    } else {
      this.usuarioAutenticado = false

      this.mostrarMenuEmitter.emit(false)
      alert('Email ou senha incorretos')
    }
  }
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
