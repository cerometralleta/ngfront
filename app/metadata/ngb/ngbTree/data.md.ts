/**
 * ztree data
 */
export class Data {
    constructor() {
        
    }
    keep:Keep;
    key:Key;
    simpleData:SimpleData
}

export class Keep {
    constructor() {
        
    }
    leaf:boolean;
    parent:boolean;
}

export class Key {
    constructor() {}
    checked:string;
    children:string;
    name:string;
    title:string;
    url:string;
}

export class SimpleData {
    constructor() {
        
    }
    enable:boolean;
    idKey:string;
    pIdKey:string;
    rootPId:string;
}