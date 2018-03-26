import { Component, OnInit ,AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { LoggerService } from '../../frame/service/logger.service';
import { FrameConstants } from '../../frame/constants/FrameConstants';
import { LocalStorage } from '../../frame/storage/local.storage';
import { CommonUtils } from '../../frame/utils/common.util';
declare var $: any;
@Component({
    selector: 'ng4b-tree',
    templateUrl: './ngbTree.component.html'
})

/**
 * 树组件
 */ 
export class NgbTreeComponent implements AfterViewInit {
    private ngbTree: any;

    /**
     *  参考
     *  http://m.blog.csdn.net/article/details?id=52452032
     *  http://www.open-open.com/lib/view/open1461113267205.html
     */
    @ViewChild('ngbTree') erf: ElementRef;

    // 输入
     @Input() setting: any;
     @Input() znodes: Array<any>;

    constructor(private logger: LoggerService, private localStorage: LocalStorage) {
     }

    ngAfterViewInit() {

        // 设置ztree ajax header
        this.setting.async.headers = CommonUtils.getAjaxToken2Header(this.localStorage.get(FrameConstants.Authorization));
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.ngbTree = $.fn.zTree.init($(this.erf.nativeElement), this.setting, this.znodes);
    }

    reAsyncChildNodes(treeNode){
         this.ngbTree.reAsyncChildNodes(treeNode, 'refresh');
    }
}