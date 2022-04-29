import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class GuardService implements CanActivate{
    constructor(private authService: AuthService, private router: Router){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        //if( this.authService.isLogged ) {
        console.log(this.authService.isLoggedIn$)
        // if( this.authService.isLoggedIn$ ) {
        //     return true;
        // } else {
        //     this.router.navigate(['user/login']);
        //     return false;
        // }

        console.log(route, state);
        return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
          if (isLoggedIn) {
            return true;
          } else {
            this.router.navigate(['user/login']);
            return false;
          }
        }))
    }
}