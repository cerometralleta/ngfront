import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule,JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { Routing, AppRoutingProviders } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { FrameModule } from './frame/frame.module';
import { Ngb2Module } from './ngb/ngb.module';
import { SmModule } from './sm/sm.module';
import { DataViewResolver } from './sm/resolver/dataViewResolver';
import { FormViewResolver } from './sm/resolver/formViewResolver';
import { CustomReuseStrategy } from './frame/service/customReuseStrategy.service';
@NgModule({
    imports: [FrameModule, Routing, Ngb2Module, SmModule],
    exports: [],
    declarations: [
        AppComponent
    ],
    providers: [AppRoutingProviders, DataViewResolver, FormViewResolver,
       { provide: LocationStrategy, useClass: HashLocationStrategy  },
       {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
    ],
    bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
