export class Pattern {
    constructor(tip:string,rule:string,checked:boolean) {
        this.tip = tip;
        this.rule = rule;
        this.checked = checked;
    }
    tip:string;
    rule:string;
    checked:boolean;
}