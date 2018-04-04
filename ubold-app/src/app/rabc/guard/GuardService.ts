import { Injectable } from '@angular/core';
import { CanActivate, // 守卫，处理导航到某路由的情况。
         Router,
         ActivatedRouteSnapshot,  //
         RouterStateSnapshot, //
         CanActivateChild // 守卫，处理导航到子路由的情况
         } from '@angular/router';
import { LocalStorage } from '../../frame/storage/local.storage';
import { FrameConstants } from '../../frame/constants/FrameConstants';
import { ToastrService } from '../../frame/service/toastr.service';
@Injectable()
export class GuardService implements CanActivate {
    constructor (private localStorage: LocalStorage, private toastr: ToastrService){
    }
    authority: any;
    homePath = '/home/';
    canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
        this.authority = JSON.parse(this.localStorage.get(FrameConstants.AUTHORITY));
        const url = this.getUrl(route);
        if (this.authority[url] && this.authority[url] !== ''){
           return true;
        }
        this.toastr.warning('您没有操作权限');
        return false;
    }

    getUrl(route: ActivatedRouteSnapshot){
        let urlstr = '';
        route.url.forEach(function(currentValue, index, arr){
            urlstr += currentValue;
            if(arr.length - 1 !== index){
                urlstr += '/';
            }
        }, 'url');
        return urlstr;
    }
}