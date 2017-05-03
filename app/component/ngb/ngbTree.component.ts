import { Component, OnInit ,AfterViewInit,ElementRef,ViewChild,Input } from '@angular/core';
import { LoggerService } from "../../service/basic/logger.service";
import { Setting } from "../../metadata/ngb/ngbTree/setting.metadata";
declare var $:any;
@Component({
    selector: 'ngb-tree',
    templateUrl: './app/component/ngb/ngbTree.component.html'
})

/**
 * 树组件
 */ 
export class NgbTreeComponent implements AfterViewInit {
    private mytree:any;

    /**
     *  参考
     *  http://m.blog.csdn.net/article/details?id=52452032
     *  http://www.open-open.com/lib/view/open1461113267205.html
     */
    @ViewChild("ngbtree") ul: ElementRef;

    //输入
     @Input() setting: Setting;

    constructor(private logger:LoggerService) {
     }

    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.mytree = $.fn.zTree.init($(this.ul.nativeElement), this.setting, this.setting.znodes);
    }
}