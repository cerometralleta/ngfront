import { Component, OnInit } from '@angular/core';
import { LoggerService } from "./service/logger.service";
@Component({
    selector: 'ubold-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent implements OnInit {
    private description:string;
    constructor(private logger:LoggerService) { }

    ngOnInit() {
        this.logger.debug("ubold starting"); 
        this.description = "hello ubold";
    }
}