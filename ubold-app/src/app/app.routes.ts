import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './frame/component/home.componet';
import { MainComponent } from './frame/component/main.component';
import { DataViewComponent } from './sm/component/dataView.component';
import { DataViewResolver } from './sm/resolver/dataViewResolver';
import { DataViewEditComponent } from './sm/component/dataViewEdit.component';
import { DataViewListComponent } from './sm/component/dataViewList.component';
import { DataViewCreateComponent } from './sm/component/dataViewCreate.component';
import { FormViewCreateComponent } from './sm/component/formViewCreate.component';
import { FormViewComponent } from './sm/component/formView.component';
import { FormViewResolver } from './sm/resolver/formViewResolver';
import { LoginComponent } from './frame/component/login.component';
import { SqldefineEditComponent } from './sm/component/sqldefineEdit.component';
import { MenuEditComponent } from './rabc/component/MenuEdit.component';



const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: '',  // 如果没有设置一个空路由的话, "/home" 会报错, 一定要 "/home/detail" 才行. 
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'main',
                component: MainComponent
            },
            {
                path: 'dataview/:code',
                component: DataViewComponent,
                pathMatch: 'prefix',
                resolve: {

                    // define dataViewResolver
                     dataViewResolver: DataViewResolver
                }
            },
            {
                path: 'dataviewedit/:code',
                component: DataViewEditComponent,
                resolve: {

                    // define dataViewResolver
                     dataViewResolver: DataViewResolver
                }
            },
            {
                path: 'dataviewlist',
                component: DataViewListComponent
            },
            {
                path: 'dataviewcreate',
                component: DataViewCreateComponent
            },
            {
                path: 'formviewcreate',
                component: FormViewCreateComponent
            },
            {
                path: 'sqldefineedit',
                component: SqldefineEditComponent
            },
            {
                path: 'menuedit',
                component: MenuEditComponent
            },
            {
                path: 'formview/:sqlid',
                component: FormViewComponent,
                pathMatch: 'prefix',
                resolve: {

                    // define formViewResolver
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