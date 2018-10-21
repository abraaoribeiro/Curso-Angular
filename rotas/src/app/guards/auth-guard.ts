import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../login/auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
return this.verificarAcesso();

  }
  private verificarAcesso(){
    if (this.authService.usuarioEstaAutenticado()) {
      return true;
    } else {
      this.router.navigate(['/login'])

      return false;
    }
  }
  canLoad(route: Route): Observable<boolean>|boolean{
    console.log('canLoad: Verificando se usuário pode carregar o cod do módulo')
    return this.verificarAcesso();
  }
}

