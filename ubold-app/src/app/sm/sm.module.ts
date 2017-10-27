import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { DataViewComponent } from './component/dataView.component';
import { DataViewEditComponent } from './component/dataViewEdit.component';
import { SelectorComponent } from './component/selector.component';
import { FormViewEditComponent } from './component/formViewEdit.component';
import { DataViewListComponent } from './component/dataViewList.component';
import { FormViewComponent } from './component/formView.component';
import { ConfirmComponent } from '../ngb/component/confirm.component';
import { IconpickerComponent } from '../ngb/component/iconpicker.component';
import { PatternComponent } from './component/pattern.component';
import { DataViewCreateComponent } from './component/dataViewCreate.component';
import { FormViewCreateComponent } from './component/formViewCreate.component';
import { Ngb2Module } from '../ngb/ngb.module';
import { ButtonDialogComponent } from './component/buttonDialog.component';
import { TypeFilterPipe } from '../frame/pipe/ngFilter.pipe';
import { FormViewFieldEditComponent } from './component/formViewFieldEdit.component';
import { LoggerService } from '../frame/service/logger.service';
import { HttpService } from '../frame/service/http.service';
import { ToastrService } from '../frame/service/toastr.service';
import { FormVerifiyService } from '../frame/service/formVerifiy.service';
import { FormatDatepickerComponent } from './component/format-datepicker/format-datepicker.component';


/**
 * SQL MANAGE模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule, FormsModule, Routing, HttpModule, JsonpModule, Ngb2Module, ReactiveFormsModule],
    exports: [DataViewComponent, DataViewEditComponent, DataViewCreateComponent, FormViewCreateComponent
        , FormViewEditComponent, FormViewComponent, SelectorComponent,
        DataViewListComponent, ConfirmComponent, IconpickerComponent
    ],
    declarations: [
        DataViewComponent, DataViewEditComponent, ButtonDialogComponent, TypeFilterPipe, DataViewCreateComponent
        , FormViewCreateComponent , FormViewEditComponent, FormViewFieldEditComponent, FormViewComponent,
        SelectorComponent, DataViewListComponent, ConfirmComponent, IconpickerComponent, PatternComponent, FormatDatepickerComponent
    ],
    entryComponents: [ButtonDialogComponent, FormViewFieldEditComponent,
        FormViewComponent, SelectorComponent, ConfirmComponent, PatternComponent,FormatDatepickerComponent],
    providers: [LoggerService, AppRoutingProviders, HttpService, ToastrService, FormVerifiyService]
})
export class SmModule { }
