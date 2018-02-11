import { GoldbalConstant } from './global.constant';

/**
 * 字典
 */
export class DictConstant {
  // 修改方式
  static createUpdateTypes() {
    const updateTypes = new Array<any>();
    updateTypes.push({ code: 'hide', text: 'hide' });
    updateTypes.push({ code: 'enable', text: 'enable' });
    updateTypes.push({ code: 'disable', text: 'disable' });
    return updateTypes;
  }

  static createAligns() {
    const aligns = new Array<any>();
    aligns.push({ code: 'center', text: 'center' });
    aligns.push({ code: 'right', text: 'right' });
    aligns.push({ code: 'left', text: 'left' });
    return aligns;
  }

  static createValigns() {
    const valigns = new Array<any>();
    valigns.push({ code: 'middle', text: 'middle' });
    valigns.push({ code: 'top', text: 'top' });
    valigns.push({ code: 'bottom', text: 'bottom' });
    return valigns;
  }

  static createfieldTypes() {
    const fieldTypes = new Array<any>();
    // tslint:disable-next-line:forin
    for (const type in GoldbalConstant.DICT_COMPONENTTYPE) {
      fieldTypes.push({code: type, text: GoldbalConstant.DICT_COMPONENTTYPE[type]});
    }
    return fieldTypes;
  }

  static createButtons() {
    const funcButtons = new Array<any>();
    funcButtons.push({ code: 'service', text: 'service' });
    funcButtons.push({ code: 'modal', text: 'modal' });
    funcButtons.push({ code: 'window', text: 'window' });
    return funcButtons;
  }

  static createScopes() {
    const scopes = new Array<any>();
    scopes.push({ code: 'ALL', text: 'ALL' });
    scopes.push({ code: 'CHILD', text: 'CHILD' });
    scopes.push({ code: 'SELF', text: 'SELF' });
    return scopes;
  }

  static createExpressions() {
    const expressions = new Array<any>();
    expressions.push({ code: '=', text: '=' });
    expressions.push({ code: '>', text: '>' });
    expressions.push({ code: '>=', text: '>=' });
    expressions.push({ code: '<', text: '<' });
    expressions.push({ code: '<=', text: '<=' });
    expressions.push({ code: 'like', text: 'like' });
    return expressions;
  }

  static createMethods() {
    const methods = new Array<any>();
    methods.push({ code: 'post', text: 'POST' });
    methods.push({ code: 'get', text: 'GET' });
    return methods;
  }

  static createLocation() {
    const location = new Array<any>();
    location.push({ code: 'nav', text: 'nav' });
    location.push({ code: 'row', text: 'row' });
    return location;
  }

  static createModalsize() {
    const modalsize = new Array<any>();
    modalsize.push({ code: 'lg', text: 'lg' });
    modalsize.push({ code: 'sm', text: 'sm' });
    return modalsize;
  }

  static createSidePagination() {
    const sidePagination = new Array<any>();
    sidePagination.push({ code: 'client', text: 'client' });
    sidePagination.push({ code: 'server', text: 'server' });
    return sidePagination;
  }

  static createQueryParamsType() {
    const queryParamsType = new Array<any>();
    queryParamsType.push({ code: 'undefined', text: 'undefined' });
    queryParamsType.push({ code: 'limit', text: 'limit' });
    return queryParamsType;
  }

  // 'basic', 'all', 'selected'
  static createExportDataType() {
    const exportDataType = new Array<any>();
    exportDataType.push({ code: 'basic', text: 'basic' });
    exportDataType.push({ code: 'all', text: 'all' });
    exportDataType.push({ code: 'selected', text: 'selected' });
    return exportDataType;
  }

  static createStatusList() {
    const status = new Array<any>();
    status.push({ code: '1', text: '已发布' });
    status.push({ code: '0', text: '待发布' });
    return status;
  }

}
