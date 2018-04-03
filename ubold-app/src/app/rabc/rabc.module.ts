import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routing, AppRoutingProviders } from '../app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../frame/service/http.service';
import { ConfirmService } from '../frame/service/confirm.service';
import { LoggerService } from '../frame/service/logger.service';
import { PermissionFuncComponent } from './component/permissionFunc.component';
import { PermissionMenuComponent } from './component/permissionMenu.component';
import { MenuEditComponent } from './component/MenuEdit.component';
import { Ngb2Module } from '../ngb/ngb.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardService } from './guard/GuardService';

/**
 * 表单模块
 * ningzk
 */
@NgModule({
    imports: [BrowserModule, FormsModule, Routing, HttpModule, JsonpModule, Ngb2Module, ReactiveFormsModule],
    exports: [PermissionFuncComponent, PermissionMenuComponent, MenuEditComponent],
    declarations: [
        PermissionFuncComponent, PermissionMenuComponent, MenuEditComponent
    ],
    providers: [LoggerService, AppRoutingProviders, HttpService, ConfirmService, GuardService]
})
export class RabcModule { }
