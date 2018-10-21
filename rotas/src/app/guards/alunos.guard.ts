import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';


export class AlunoGuard implements CanActivateChild{

	canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> |boolean {
        //console.log(route)
        //console.log(state)
        //não deixa o usuario não consegue editar
        if(state.url.includes('editar')){
            //return false;
           // return Observable.of(false);
        }
        return true;
    }

}
