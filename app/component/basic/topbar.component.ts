import { Component, OnInit } from '@angular/core';
import { LoggerService } from "../../service/basic/logger.service";
@Component({
    selector: 'home-topbar',
    templateUrl: './app/component/basic/topbar.component.html'
})
export class TopbarComponent implements OnInit {
  
    constructor(private logger:LoggerService) { }

    ngOnInit() { 
        this.logger.debug("topbar init");
    }
}