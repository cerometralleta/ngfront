import { Component, OnInit,ModuleWithProviders } from '@angular/core';
import { Router, RouterModule,Routes } from "@angular/router";
import { HomeComponent } from "./component/home.componet";
import { LoginComponent } from "./component/login.component";
import { SqldefineComponent } from "./component/sqldefine.component";

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sqldefine', component: SqldefineComponent },
    // {
    //     path: 'companies', children: [
    //         {
    //             path: 'add-companies',
    //             component: AddCompaniesComponent
    //         },
    //         {
    //             path: 'edit-companies',
    //             component: EditCompaniesComponent
    //         },
    //         {
    //             path: '',
    //             component: CompaniesComponent,
    //         }
    //     ]
    // },
    // { path: 'detail/:id', component: CompanieDetailComponent },
    { path: '**', redirectTo: '' }
];

export const AppRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);