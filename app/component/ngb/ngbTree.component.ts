import { Component, OnInit ,AfterViewInit,ElementRef,ViewChild,Input } from '@angular/core';
import { LoggerService } from "../../service/basic/logger.service";
import { Setting } from "../../metadata/ngb/ngbTree/dataModule.md";
declare var $:any;
@Component({
    selector: 'ng4b-tree',
    templateUrl: './app/component/ngb/ngbTree.component.html'
})

/**
 * 树组件
 */ 
export class NgbTreeComponent implements AfterViewInit {
    private ngbTree:any;

    /**
     *  参考
     *  http://m.blog.csdn.net/article/details?id=52452032
     *  http://www.open-open.com/lib/view/open1461113267205.html
     */
    @ViewChild("ngbTree") erf: ElementRef;

    //输入
     @Input() setting: Setting;
     @Input() znodes:Array<any>;

    constructor(private logger:LoggerService) {
     }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.ngbTree = $.fn.zTree.init($(this.erf.nativeElement), this.setting, this.znodes);
    }
}