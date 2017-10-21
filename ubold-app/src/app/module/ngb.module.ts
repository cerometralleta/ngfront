import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { LoggerService } from '../service/basic/logger.service';
import { NgbTreeComponent } from '../component/ngb/ngbTree.component';
import { HttpService } from '../service/basic/http.service';
import { NgbGridComponent } from '../component/ngb/ngbGrid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCoderComponent } from '../component/ngb/ngbCoder.component';
import { ConfirmService } from '../service/basic/confirm.service';
import { DatetimepickerComponent } from '../component/ngb/datetimepicker.component';

/**
 * 表单模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule,NgbModule,NgbModule.forRoot()],
    exports: [NgbTreeComponent,NgbGridComponent, NgbCoderComponent, NgbModule, NgbCoderComponent, DatetimepickerComponent],
    declarations: [
        NgbTreeComponent, NgbGridComponent, NgbCoderComponent, DatetimepickerComponent
    ],
    providers: [LoggerService, AppRoutingProviders, HttpService, ConfirmService]
})
export class Ngb2Module { }
