import { Component, OnInit,ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { DataViewComponent } from "./component/sm/dataView.component";
import { MainComponent } from "./component/frame/main.component";
import { HomeComponent } from "./component/frame/home.componet";
import { LoginComponent } from "./component/frame/login.component";


const appRoutes: Routes = [
    { path: '',  
      redirectTo: "login",
      pathMatch: "full"     
    },
    { path: 'home', component: HomeComponent ,
      children:[
            {
                path: ""  //如果没有设置一个空路由的话, "/home" 会报错, 一定要 "/home/detail" 才行. 
            },
            {
                path: "main",
                component:MainComponent
            },
            {
                path: "dataview",
                component: DataViewComponent            
            } 
      ]
    },
    { path: 'login', component: LoginComponent },
    // { path: 'detail/:id', component: CompanieDetailComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);