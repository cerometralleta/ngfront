import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { DataViewComponent } from "./component/sm/dataView.component";
import { MainComponent } from "./component/frame/main.component";
import { HomeComponent } from "./component/frame/home.componet";
import { LoginComponent } from "./component/frame/login.component";
import { DataViewEditComponent } from "./component/sm/dataViewEdit.component";
import { DataViewCreateComponent } from "./component/sm/dataViewCreate.component";
import { FormViewCreateComponent } from "./component/sm/formViewCreate.component";
import { DataViewResolver } from "./resolver/sm/dataViewResolver";
import { FormViewComponent } from "./component/sm/formView.component";
import { FormViewResolver } from "./resolver/sm/formViewResolver";


const appRoutes: Routes = [
    {
        path: '',
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: "",  //如果没有设置一个空路由的话, "/home" 会报错, 一定要 "/home/detail" 才行. 
                redirectTo: "home",
                pathMatch: "full"
            },
            {
                path: "main",
                component: MainComponent
            },
            {
                path: "dataview/:code",
                component: DataViewComponent,
                pathMatch: "prefix",
                resolve: {

                    //define dataViewResolver
                     dataViewResolver: DataViewResolver
                }
            },
            {
                path: "dataviewedit/:code",
                component: DataViewEditComponent,
                resolve: {

                    //define dataViewResolver
                     dataViewResolver: DataViewResolver
                }
            },
            {
                path: "dataviewcreate",
                component: DataViewCreateComponent
            },
            {
                path: "formviewcreate",
                component: FormViewCreateComponent
            },
            {
                path: "formview/:sqlid",
                component: FormViewComponent,
                pathMatch: "prefix",
                resolve: {

                    //define formViewResolver
                     formViewResolver: FormViewResolver
                }
            }
        ]
    },
    { path: 'login', component: LoginComponent },
    // { path: 'detail/:id', component: CompanieDetailComponent },
    { path: '**', component: LoginComponent }
];

export const AppRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);