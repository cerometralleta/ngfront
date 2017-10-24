import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTreeComponent } from './component/ngbTree.component';
import { NgbGridComponent } from './component/ngbGrid.component';
import { NgbCoderComponent } from './component/ngbCoder.component';
import { DatetimepickerComponent } from './component/datetimepicker.component';
import { HttpService } from '../frame/service/http.service';
import { ConfirmService } from '../frame/service/confirm.service';
import { LoggerService } from '../frame/service/logger.service';


/**
 * 表单模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule, FormsModule, Routing, HttpModule, JsonpModule, NgbModule, NgbModule.forRoot()],
    exports: [NgbTreeComponent, NgbGridComponent, NgbCoderComponent, NgbModule, NgbCoderComponent, DatetimepickerComponent],
    declarations: [
        NgbTreeComponent, NgbGridComponent, NgbCoderComponent, DatetimepickerComponent
    ],
    providers: [LoggerService, AppRoutingProviders, HttpService, ConfirmService]
})
export class Ngb2Module { }
