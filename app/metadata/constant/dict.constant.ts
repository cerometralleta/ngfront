/**
 * 字典
 */
export class DictConstant {
    constructor(parameters) {
        
    }

    //修改方式
  static createUpdateTypes() {
    let updateTypes = new Array<any>();
    updateTypes.push({ code: "hide", text: "hide" });
    updateTypes.push({ code: "enable", text: "enable" });
    updateTypes.push({ code: "disable", text: "disable" });
    return updateTypes;
  }

   static createAligns() {
    let aligns = new Array<any>();
    aligns.push({ code: "center", text: "center" });
    aligns.push({ code: "right", text: "right" });
    aligns.push({ code: "left", text: "left" });
    return aligns;
    }

  static createValigns() {
    let valigns = new Array<any>();
    valigns.push({ code: "middle", text: "middle" });
    valigns.push({ code: "top", text: "top" });
    valigns.push({ code: "bottom", text: "bottom" });
    return valigns;
  }

  static createfieldTypes() {
    let fieldTypes = new Array<any>();
    fieldTypes.push({ code: "text", text: "text" });
    fieldTypes.push({ code: "radio", text: "radio" });
    fieldTypes.push({ code: "select", text: "select" });
    fieldTypes.push({ code: "textarea", text: "textarea" });
    return fieldTypes;
  }

  static createButtons(){
    let funcButtons = new Array<any>();
    funcButtons.push({ code: "service", text: "service" });
    funcButtons.push({ code: "modal", text: "modal" });
    funcButtons.push({ code: "window", text: "window" });
    return funcButtons;
  }
  
  static createScopes() {
    let scopes = new Array<any>();
    scopes.push({ code: "ALL", text: "ALL" });
    scopes.push({ code: "CHILD", text: "CHILD" });
    scopes.push({ code: "SELF", text: "SELF" });
    return scopes;
  }

  static createExpressions(){ 
    let expressions = new Array<any>();
    expressions.push({ code: "=", text: "=" });
    expressions.push({ code: ">", text: ">" });
    expressions.push({ code: ">=", text: ">=" });
    expressions.push({ code: "<", text: "<" });
    expressions.push({ code: "<=", text: "<=" });
    expressions.push({ code: "like", text: "like" });
    return expressions;
  }

  static createMethods() {
    let methods = new Array<any>();
    methods.push({ code: "post", text: "POST" });
    methods.push({ code: "get", text: "GET" }); 
    return methods;
  }
  
   static createLocation() {
    let location = new Array<any>();
    location.push({ code: "nav", text: "nav" });
    location.push({ code: "row", text: "row" }); 
    return location;
  }

  static createSidePagination() {
    let sidePagination = new Array<any>();
    sidePagination.push({ code: "client", text: "client" });
    sidePagination.push({ code: "server", text: "server" }); 
    return sidePagination;
  }

   static createQueryParamsType() {
    let queryParamsType = new Array<any>();
    queryParamsType.push({ code: "undefined", text: "undefined" });
    queryParamsType.push({ code: "limit", text: "limit" }); 
    return queryParamsType;
  }

// 'basic', 'all', 'selected'
   static createExportDataType() {
    let exportDataType = new Array<any>();
    exportDataType.push({ code: "basic", text: "basic" });
    exportDataType.push({ code: "all", text: "all" }); 
    exportDataType.push({ code: "selected", text: "selected" }); 
    return exportDataType;
  }

}
