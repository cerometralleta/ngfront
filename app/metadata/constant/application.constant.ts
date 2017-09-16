/**
 * system config
 */
export class Application {
    constructor() {
        
    }
    static baseContext:string = "http://localhost:8090/ubold";

    //创建视图
    static ubold_sm_persistent:string = Application.baseContext + "/api/sm/view/persistent";

    //查询视图
     static ubold_sm_query:string = Application.baseContext + "/api/sm/view/find/";

     //查询sqlDefine视图
     static ubold_sm_sqldefine:string = Application.baseContext + "/api/sm/view/find/DV10000000000000";

     //SQL自定义选择器视图
     static ubold_sm_sqldefine_selector:string = Application.baseContext + "/api/sm/view/find/DV10000000000001";

    //查询视图
     static ubold_sm_fetch:string = Application.baseContext + "/api/sm/view/fetch";
     static ubold_sql_fetch:string = Application.baseContext + "/api/sm/sql/fetch";
     static ubold_sql_delete:string = Application.baseContext + "/api/sm/sql/delete/";
     static ubold_sql_get_code:string = Application.baseContext + "/api/sm/sql/getCode/";
     
     //dataViewList
    static ubold_sm_sql_dataList:string =Application.baseContext + "/api/sm/sql/bootstrap/SM10000000000001";

    static ubold_sm_sql_bootstrap_dataList:string =Application.baseContext + "/api/sm/sql/bootstrap";
    static ubold_sm_sql_bootstrap_ztree:string =Application.baseContext + "/api/sm/sql/ztree";
    //视图保存
    static ubold_sm_insert:string = Application.baseContext + "/api/sm/sql/create/";
    static ubold_sm_modfity:string = Application.baseContext + "/api/sm/sql/modfity/";
    static ubold_sm_delete:string = Application.baseContext + "/api/sm/sql/delete/";


     //生成视图列
    static ubold_sqldefine_createColumnList = Application.baseContext + "/api/sm/sql/createColumnList/"
    
    //创建表单视图
    static ubold_form_persistent :string = Application.baseContext + "/api/sm/form/persistent";
    static ubold_form_query:string = Application.baseContext + "/api/sm/form/find/";
    
}