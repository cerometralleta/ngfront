import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule } from "@angular/http";
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from "@angular/forms";
import { Routing, AppRoutingProviders } from "../app.routes";
import { LoggerService } from "../service/basic/logger.service";
import { NgbTreeComponent } from "../component/ngb/ngbTree.component";
import { HttpService } from "../service/basic/http.service";
import { DataViewComponent } from "../component/sm/dataView.component";
import { Ngb2Module } from "./ngb.module";
import { DataViewEditComponent } from "../component/sm/dataViewEdit.component";
import { ReactiveFormsModule } from '@angular/forms';
import { TypeFilterPipe } from "../pipe/ngFilter.pipe";
import { ButtonDialogComponent } from "../component/sm/buttonDialog.component";
import { DataViewCreateComponent } from "../component/sm/dataViewCreate.component";
import { FormViewCreateComponent } from "../component/sm/formViewCreate.component";
import { FormViewEditComponent } from "../component/sm/formViewEdit.component";
import { FormViewFieldEditComponent } from "../component/sm/formViewFieldEdit.component";
import { FormViewComponent } from "../component/sm/formView.component";
import { ToastrService } from "../service/basic/toastr.service";
import { SelectorComponent } from "../component/sm/selector.component";
import { DataViewListComponent } from "../component/sm/dataViewList.component";
import { FormVerifiyService } from "../service/sm/formVerifiy.service";
import { ConfirmComponent } from '../component/ngb/confirm.component';
import { IconpickerComponent } from '../component/ngb/iconpicker.component';
import { ServerURLInterceptor } from '../service/sm/ServerURLInterceptor';
import { provideInterceptorService } from '../../node_modules/._ng2-interceptors@1.3.0-1@ng2-interceptors';

/**
 * SQL MANAGE模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule,Ngb2Module,ReactiveFormsModule],
    exports: [DataViewComponent,DataViewEditComponent,DataViewCreateComponent,FormViewCreateComponent
        ,FormViewEditComponent,FormViewComponent,SelectorComponent,DataViewListComponent,ConfirmComponent,IconpickerComponent
    ],
    declarations: [
        DataViewComponent,DataViewEditComponent,ButtonDialogComponent,TypeFilterPipe,DataViewCreateComponent
        ,FormViewCreateComponent ,FormViewEditComponent,FormViewFieldEditComponent,FormViewComponent,
        SelectorComponent,DataViewListComponent,ConfirmComponent,IconpickerComponent
    ],
    entryComponents:[ButtonDialogComponent,FormViewFieldEditComponent,FormViewComponent,SelectorComponent,ConfirmComponent],
    providers: [LoggerService,AppRoutingProviders,HttpService,ToastrService,FormVerifiyService,ServerURLInterceptor, 
        provideInterceptorService([
          ServerURLInterceptor
        ])]
})
export class SmModule { }
