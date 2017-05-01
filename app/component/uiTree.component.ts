import { Component, OnInit ,AfterViewInit,ElementRef,ViewChild,Input } from '@angular/core';
import { LoggerService } from "../service/logger.service";
import { InputParam } from "../metadata/ztree/inputParam.metadata";
declare var $:any;
@Component({
    selector: 'ui-tree',
    templateUrl: './app/component/uiTree.component.html'
})

/**
 * 树组件
 */ 
export class UiTreeComponent implements AfterViewInit {
    private mytree:any;

    /**
     *  参考
     *  http://m.blog.csdn.net/article/details?id=52452032
     *  http://www.open-open.com/lib/view/open1461113267205.html
     */
    @ViewChild("ztree") ul: ElementRef;

    //输入
     @Input() inputParam: InputParam;

    constructor(private logger:LoggerService) {
     }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.mytree = $.fn.zTree.init($(this.ul.nativeElement), this.inputParam.setting, this.inputParam.nodes);
    }
}