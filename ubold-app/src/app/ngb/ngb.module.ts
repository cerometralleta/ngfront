import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTreeComponent } from './component/ngbTree.component';
import { NgbGridComponent } from './component/ngbGrid.component';
import { DatetimepickerComponent } from './component/datetimepicker.component';
import { HttpService } from '../frame/service/http.service';
import { ConfirmService } from '../frame/service/confirm.service';
import { LoggerService } from '../frame/service/logger.service';
import { NgbCodeComponent } from './component/ngbCode.component';
import { NgbDropdownComponent } from './component/ngbDropdown.component';


/**
 * 表单模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule, FormsModule, Routing, HttpModule, JsonpModule, NgbModule, NgbModule.forRoot()],
    exports: [NgbTreeComponent, NgbGridComponent, NgbCodeComponent, NgbModule, NgbCodeComponent,
        DatetimepickerComponent, NgbDropdownComponent],
    declarations: [
        NgbTreeComponent, NgbGridComponent, NgbCodeComponent, DatetimepickerComponent, NgbDropdownComponent
    ],
    providers: [LoggerService, AppRoutingProviders, HttpService, ConfirmService]
})
export class Ngb2Module { }
