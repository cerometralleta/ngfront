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
 
/**
 * SQL MANAGE模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule,FormsModule,Routing,HttpModule,JsonpModule,Ngb2Module,ReactiveFormsModule],
    exports: [DataViewComponent,DataViewEditComponent,DataViewCreateComponent,FormViewCreateComponent
        ,FormViewEditComponent,FormViewComponent
    ],
    declarations: [
        DataViewComponent,DataViewEditComponent,ButtonDialogComponent,TypeFilterPipe,DataViewCreateComponent
        ,FormViewCreateComponent ,FormViewEditComponent,FormViewFieldEditComponent,FormViewComponent
    ],
    entryComponents:[ButtonDialogComponent,FormViewFieldEditComponent,FormViewComponent],
    providers: [LoggerService,AppRoutingProviders,HttpService]
})
export class SmModule { }
