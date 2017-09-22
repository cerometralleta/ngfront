import { AfterViewInit } from '@angular/core';
declare var $:any;
export class BaseComponent implements AfterViewInit {

    ngAfterViewInit(): void {
       this.jsPlugin();
    }

    //js插件初始化
    jsPlugin(){
        $.fn.popover && $('[data-toggle="popover"]').popover();
    }
}