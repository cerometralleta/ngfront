import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule,JsonpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { Routing, AppRoutingProviders } from "./app.routes";
import { BasicModule } from "./basic.module";
import { LoggerService } from "./service/basic/logger.service";
import { HttpService } from "./service/basic/http.service";
@NgModule({
    imports: [BasicModule,Routing],
    exports: [],
    declarations: [
        AppComponent
    ],
    providers: [AppRoutingProviders],
    bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
