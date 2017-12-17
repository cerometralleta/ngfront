/**
 * system config
 */
export class Application {
    static baseContext = 'http://localhost:8090/ubold';

    // 授权登陆
    static login: string = Application.baseContext + '/rabc/auth/api/permit/doLogin';

    // 创建视图
    static ubold_sm_persistent: string = Application.baseContext + '/sm/view/api/persistent';

    // 查询视图
     static ubold_sm_query: string = Application.baseContext + '/sm/view/api/find/';

     // 查询sqlDefine视图
     static ubold_sm_sqldefine: string = Application.baseContext + '/sm/view/api/find/DV10000000000000';

     // SQL自定义选择器视图

     static ubold_sm_sqldefine_selector: string = Application.baseContext + '/sm/view/api/find/DV10000000000001';

    // 查询视图
     static ubold_sm_fetch: string = Application.baseContext + '/sm/view/api/fetch';
     static ubold_sql_fetch: string = Application.baseContext + '/sm/sql/api/fetch';
     static ubold_sql_delete: string = Application.baseContext + '/sm/sql/api/delete/';
     static ubold_sql_get_code: string = Application.baseContext + '/sm/sql/api/getCode/';

     // dataViewList
    // tslint:disable-next-line:member-ordering
    static ubold_sm_sql_dataList: string = Application.baseContext + '/sm/sql/api/bootstrap/SM10000000000001';
    // tslint:disable-next-line:member-ordering
    static ubold_sm_sql_bootstrap_dataList: string = Application.baseContext + '/sm/sql/api/bootstrap';
    // tslint:disable-next-line:member-ordering
    static ubold_sm_sql_bootstrap_ztree: string = Application.baseContext + '/sm/sql/api/ztree';
    // 视图保存
    // tslint:disable-next-line:member-ordering
    static ubold_sm_insert: string = Application.baseContext + '/sm/sql/api/create/';
    // tslint:disable-next-line:member-ordering
    static ubold_sm_modfity: string = Application.baseContext + '/sm/sql/api/modfity/';
    // tslint:disable-next-line:member-ordering
    static ubold_sm_delete: string = Application.baseContext + '/sm/sql/api/delete/';


     // 生成视图列
    // tslint:disable-next-line:member-ordering
    static ubold_sqldefine_createColumnList: string = Application.baseContext + '/sm/sql/api/createColumnList/';

    // 创建表单视图
    // tslint:disable-next-line:member-ordering
    static ubold_form_persistent: string = Application.baseContext + '/sm/form/api/persistent';
    // tslint:disable-next-line:member-ordering
    static ubold_form_query: string = Application.baseContext + '/sm/form/api/find/';
}