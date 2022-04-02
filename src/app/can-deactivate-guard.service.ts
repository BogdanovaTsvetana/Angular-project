import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface ICanDeactivateComponent{
    canExit: () => Observable<boolean> | Promise<boolean> | boolean;
 }

export class CanDeactivateGuardService implements CanDeactivate<ICanDeactivateComponent>{
    canDeactivate(
        component: ICanDeactivateComponent, 
        currenRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot)
    {
        console.log('you can\'t go on')
        return component.canExit();
    }

}