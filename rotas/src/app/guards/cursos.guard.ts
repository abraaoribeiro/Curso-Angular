import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CursoGuard implements CanActivateChild {
    constructor() { }


    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        console.log("Guard");
        
        return true;
    }
}

