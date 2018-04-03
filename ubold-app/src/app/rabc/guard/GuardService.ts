import { Injectable } from '@angular/core';
import { CanActivate, // 守卫，处理导航到某路由的情况。
         Router,
         ActivatedRouteSnapshot,  //
         RouterStateSnapshot, //
         CanActivateChild // 守卫，处理导航到子路由的情况
         } from '@angular/router';
@Injectable()
export class GuardService implements CanActivate {
    canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
         alert( state.url );
        // 权限检查
        return true;
    }
}