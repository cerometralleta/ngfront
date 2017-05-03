import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule,JsonpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { Routing, AppRoutingProviders } from "./app.routes";
import { LoggerService } from "./service/basic/logger.service";
import { HttpService } from "./service/basic/http.service";
import { FrameModule } from "./module/frame.module";
import { NgbModule } from "./module/ngb.module";
@NgModule({
    imports: [FrameModule,Routing,NgbModule],
    exports: [],
    declarations: [
        AppComponent
    ],
    providers: [AppRoutingProviders],
    bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
