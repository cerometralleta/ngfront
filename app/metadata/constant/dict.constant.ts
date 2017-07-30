/**
 * 字典
 */
export class DictConstant {
    constructor(parameters) {
        
    }

    //修改方式
  static createUpdateTypes() {
    let updateTypes = new Array<any>();
    updateTypes.push({ code: 0, text: "隐藏" });
    updateTypes.push({ code: 1, text: "显示" });
    updateTypes.push({ code: 2, text: "禁用" });
    return updateTypes;
  }

   static createAligns() {
    let aligns = new Array<any>();
    aligns.push({ code: "center", text: "居中" });
    aligns.push({ code: "right", text: "居右" });
    aligns.push({ code: "left", text: "居左" });
    return aligns;
    }

  static createValigns() {
    let valigns = new Array<any>();
    valigns.push({ code: "middle", text: "居中" });
    valigns.push({ code: "top", text: "顶部" });
    valigns.push({ code: "bottom", text: "底部" });
    return valigns;
  }

  static createfieldTypes() {
    let fieldTypes = new Array<any>();
    fieldTypes.push({ code: "text", text: "text" });
    fieldTypes.push({ code: "checkbox", text: "checkbox" });
    fieldTypes.push({ code: "downdrop", text: "downdrop" });
    fieldTypes.push({ code: "textarea", text: "textarea" });
    return fieldTypes;
  }

  static createFuncButtons(){
    let funcButtons = new Array<any>();
    funcButtons.push({ code: 0, text: "service" });
    funcButtons.push({ code: 1, text: "dialog" });
    funcButtons.push({ code: 2, text: "window" });
    return funcButtons;
  }
  static createScopes() {
    let scopes = new Array<any>();
    scopes.push({ code: "ALL", text: "全部子节点" });
    scopes.push({ code: "CHILD", text: "子节点" });
    scopes.push({ code: "SELF", text: "当前节点" });
    return scopes;
  }

}
