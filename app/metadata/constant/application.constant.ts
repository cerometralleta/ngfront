/**
 * system config
 */
export class Application {
    constructor() {
        
    }
    static baseContext:string = "http://localhost:8090/ubold";

    //创建视图
    static ubold_sm_persistent:string = Application.baseContext + "/api/sm/persistent";

    //查询视图
     static ubold_sm_query:string = Application.baseContext + "/api/sm/find/3555";
    
    
}