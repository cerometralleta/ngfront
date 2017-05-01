import { Component, OnInit,ModuleWithProviders } from '@angular/core';
import { Router, RouterModule,Routes } from "@angular/router";
import { HomeComponent } from "./component/basic/home.componet";
import { LoginComponent } from "./component/basic/login.component";
import { SqldefineComponent } from "./component/basic/sqldefine.component";
import { MainComponent } from "./component/basic/main.component";

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
                path: "sqldefine",
                component: SqldefineComponent            
            } 
      ]
    },
    { path: 'login', component: LoginComponent },
    // { path: 'detail/:id', component: CompanieDetailComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);