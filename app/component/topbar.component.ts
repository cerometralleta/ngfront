import { Component, OnInit } from '@angular/core';
import { LoggerService } from "../service/logger.service";
@Component({
    selector: 'home-topbar',
    templateUrl: './app/component/topbar.component.html'
})
export class TopbarComponent implements OnInit {
  
    constructor(private logger:LoggerService) { }

    ngOnInit() { 
        this.logger.debug("topbar init");
    }
}