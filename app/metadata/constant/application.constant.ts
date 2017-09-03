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
     static ubold_sm_query:string = Application.baseContext + "/api/sm/find/";

     //查询sqlDefine视图
     static ubold_sm_sqldefine:string = Application.baseContext + "/api/sm/find/DV2017090320430000";

    //查询视图
     static ubold_sm_fetch:string = Application.baseContext + "/api/sm/fetch";
    
    //视图保存
    static ubold_sm_insert:string = Application.baseContext + "/api/sqlDefine/create/";
    static ubold_sm_modfity:string = Application.baseContext + "/api/sqlDefine/modfity/";
    static ubold_sm_delete:string = Application.baseContext + "/api/sqlDefine/delete/";


     //生成视图列
    static ubold_sqldefine_createColumnList = Application.baseContext + "/api/sqlDefine/createColumnList/"
    
    //创建表单视图
    static ubold_form_persistent :string = Application.baseContext + "/api/form/persistent";
    static ubold_form_query:string = Application.baseContext + "/api/form/find/";
    
}