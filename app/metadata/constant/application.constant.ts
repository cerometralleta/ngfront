/**
 * system config
 */
export class Application {
    constructor() {
        
    }
    static baseContext:string = "http://localhost:8090/ubold";

    //创建视图
    static ubold_sm_create:string = Application.baseContext + "/api/permit/sm/create";
    
    
}