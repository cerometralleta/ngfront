export class GoldbalConstant {
    
    static GRID_OPTIONS = { SINGLE: 1, MULTIPLE: 2 };
    static STATUS_CODE = { SUCCESS: 0, FAILURE: 1 };

    /*树控制*/
    static TREE_OPTIONS = [
        { value: "ALL", text: "全部子节点" },
        { value: "CHILD", text: "子节点" },
        { value: "SELF", text: "当前节点" }
    ];

    static ERROR_MESSAGE = {
      'required': '为必填',
      'minlength': '长度不足',
      'maxlength': '长度超出范围'
    };

    static CRUD = {create:"create",update:"update",delete:"delete",retrieve:"retrieve"};
    static LOCATION = {nav:"nav",row:"row"};

    /*修改类型*/
    static MODIFTY_TYPES =  { hide: "hide", enable: "enable", disable: "disable" };

    /*按钮操作 */
    static OPTIONS_BUTTON =  { service: "service", modal: "modal", window: "window" };

    /*排序类型*/
    static SORT_TYPES = [
        { value: null, text: "" },
        { value: 'ASC', text: "ASC" },
        { value: 'DESC', text: "DESC" }
    ];

    /*是否*/
    // static OPTION_WHETHER = [CHECK_WHETHER_YES, CHECK_WHETHER_NO];

    /*数据字典控件类型*/
    static DICT_COMPONENTTYPE =
    [{ value: "TEXT", text: "文本框" },
    { value: "DROPDOWN", text: "下拉框" },
    // {value:"SELECTOR",text:"选择器"},
    { value: "TEXTAREA", text: "文本域" },
    { value: "GENERATECODE", text: "自动编码" },
    { value: "CHECKBOX", text: "单选框" },
    { value: "DATEPICKER", text: "日期" },
    { value: "VIEWSELECTOR", text: "视图选择器" }
    ];

    /*表达式*/
    static DICT_EXPRESSION = [
        { value: "=", text: "=" },
        { value: "LIKE", text: "LIKE" },
        { value: ">", text: ">" },
        { value: ">=", text: ">=" },
        { value: "<", text: "<" },
        { value: "<=", text: "<=" },
        { value: "IS NULL", text: "为空" },
        { value: "IS NOT NULL", text: "不为空" }
    ]

    /*选项*/
    static OPTION_MULTIPLE = [{ value: "", text: "请选择" }, { value: 0, text: "单选" }, { value: 1, text: "多选" }];


    /*表达式*/
    static WIN_SIZE = [
        { value: "", text: "请选择" },
        { value: 40, text: "40%" },
        { value: 50, text: "50%" },
        { value: 60, text: "60%" },
        { value: 70, text: "70%" },
        { value: 80, text: "80%" },
        { value: 90, text: "90%" },
        { value: 100, text: "100%" }
    ]

    /**正则表达式**/
    // static REGULAR_EXPRESSION = {
    //     10001: { rule: '10001', tip: '非空' },
    //     10002: { rule: '/^[a-zA-Z]+$/', tip: '英文字母' },
    //     10003: { rule: '/^[-+]?\d*$/', tip: '整数' },
    //     10004: { rule: '/^[-\+]?\d+(\.\d+)?$/', tip: '保留两位小数' },
    //     10005: { rule: '/^[a-zA-Z0-9_]+$/', tip: 'a-z,A-Z,0-9' },
    //     10006: { rule: '/^[\u0391-\uFFE5]+$/', tip: '请输入中文' },
    //     10007: { rule: '/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/', tip: 'EMAIL' },
    //     10008: { rule: '/^\d{6}$/', tip: '邮编(只能为六位)' },
    //     10009: { rule: '/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/', tip: '电话号码' },
    //     10010: { rule: '/^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/', tip: '手机号码' },
    //     10011: { rule: '/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/', tip: 'URL' },
    //     10012: { rule: '/^\d{15}(\d{2}[A-Za-z0-9])?$/', tip: '身份证' },
    //     10013: { rule: '/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/', tip: 'YYYY-MM-DD' },
    //     10014: { rule: '/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/', tip: 'YYYY-MM-DD hh:mm:ss' },
    //     10015: { rule: '/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/', tip: 'hh:mm:ss' }
    //     // 10000:{rule:'',tip:''}
    // };

    static DATETIME_FORMAT = [
        { value: "%Y-%m-%d %H:%i:%s", text: "yyyy-MM-dd hh:mm:ss" },
        { value: "%Y-%m-%d %H:%i", text: "yyyy-MM-dd hh:mm" },
        { value: "%Y-%m-%d", text: "yyyy-MM-dd" },
        { value: "%Y-%m", text: "yyyy-MM" },
        { value: "%Y", text: "yyyy" }
    ];
}

