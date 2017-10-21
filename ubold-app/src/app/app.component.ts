import { Component, OnInit } from '@angular/core';
import { LoggerService } from './service/basic/logger.service';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ubold-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private description: string;
    constructor(private logger: LoggerService) { }

    ngOnInit() {
        this.logger.debug('ubold starting');
        this.description = 'hello ubold';
    }
}