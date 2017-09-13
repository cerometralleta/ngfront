// This impl. bases upon one that can be found in the router's test cases.
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { DataViewComponent } from "../../component/sm/dataView.component";

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};

    //决定是否将当前的路由进行分离并暂存。
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.info('CustomReuseStrategy:shouldDetach', route);
        return true;
    }

    //存储分离出的路由
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // console.info('CustomReuseStrategy:store', route, handle);
        // this.handlers[route.routeConfig.path + JSON.stringify(route.params)] = handle;
    }

    //决定当前的路由是否还原
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // console.info('CustomReuseStrategy:shouldAttach', !!route.routeConfig && !!this.handlers[route.routeConfig.path]);
        return false;
    }

    // 取得之前暂存的路由
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // console.info('CustomReuseStrategy:retrieve', route);
        return null;//从暂存处取回
    }

    // 决定是否重用路由,在此处可以取得跳转前和跳转后的路由路径
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // console.info('CustomReuseStrategy:shouldReuseRoute', future, curr);
        if(future.component === curr.component){
            return JSON.stringify(future.params) == JSON.stringify(curr.params)
        }
        return future.routeConfig === curr.routeConfig;
    }

}