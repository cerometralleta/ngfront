/**
 * ztree data
 */
export class Data {
    keep: Keep;
    key: Key;
    simpleData: SimpleData;
}

export class Keep {
    leaf: boolean;
    parent: boolean;
}

export class Key {
    checked: string;
    children: string;
    name: string;
    title: string;
    url: string;
}

export class SimpleData {
    enable: boolean;
    idKey: string;
    pIdKey: string;
    rootPId: string;
}