// This impl. bases upon one that can be found in the router's test cases.
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { DataViewComponent } from "../../component/sm/dataView.component";

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.info('CustomReuseStrategy:shouldDetach', route);
        return true;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        // console.info('CustomReuseStrategy:store', route, handle);
        this.handlers[route.routeConfig.path + JSON.stringify(route.params)] = handle;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.info('CustomReuseStrategy:shouldAttach', !!route.routeConfig && !!this.handlers[route.routeConfig.path]);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // console.info('CustomReuseStrategy:retrieve', route);
        return this.handlers[route.routeConfig.path + JSON.stringify(route.params)];//从暂存处取回
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        //在此处可以取得跳转前和跳转后的路由路径
        // console.info('CustomReuseStrategy:shouldReuseRoute', future, curr);
        if(future.component === curr.component){
            return JSON.stringify(future.params) == JSON.stringify(curr.params)
        }
        return future.routeConfig === curr.routeConfig;
    }

}