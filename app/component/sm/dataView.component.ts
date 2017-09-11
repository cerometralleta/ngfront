import { Component, OnInit, Inject, Input, ViewChild, Type, ComponentFactoryResolver } from '@angular/core';
import { URLSearchParams, Http, Jsonp } from "@angular/http";
import { HttpService } from "../../service/basic/http.service";
import { Application } from "../../metadata/constant/application.constant";
import { LoggerService } from "../../service/basic/logger.service";
import { ButtonType } from "../../metadata/constant/buttonType.constant";
import { GUID } from "../../utils/guid.util";
import { Response } from "../../metadata/response.md";
import { Options, BootstrapTableDefaults } from "../../metadata/ngb/ngbGrid/options.md";
import { Setting, DataModule } from "../../metadata/ngb/ngbTree/dataModule.md";
import { DataViewModule, TreeOptions, Button, DataFilter } from "../../metadata/sm/dataViewModule.md";
import { ActivatedRoute, Params } from "../../../node_modules/._@angular_router@4.1.1@@angular/router";
import 'rxjs/add/operator/switchMap';
import { SimpleData, Key, Data, Keep } from "../../metadata/ngb/ngbTree/data.md";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataViewCreateComponent } from "./dataViewCreate.component";
import { Mock } from "../../metadata/constant/mock.constant";
import { NgbTreeComponent } from "../ngb/ngbTree.component";
import { NgbGridComponent } from "../ngb/ngbGrid.component";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { ToastrService } from "../../service/basic/toastr.service";
import { Async } from "../../metadata/ngb/ngbTree/async.md";
import { SelectorComponent } from "./selector.component";
declare var $: any;
/**
 * 统一dataView
 */
@Component({
    selector: 'sm-dataView',
    templateUrl: './app/component/sm/dataView.component.html'
})
export class DataViewComponent extends SelectorComponent {
    constructor(
        public logger: LoggerService
        , public httpService: HttpService
        , public route: ActivatedRoute
        , public modalService: NgbModal
        , public fb: FormBuilder
        , public toastr: ToastrService
        , public componentFactoryResolver: ComponentFactoryResolver
    ) {
        super(logger, httpService, modalService, fb, toastr, null);
    }
    ngOnInit() {
        // Mock.createDataViewList(this.dataViewModule);

        //监控路由守卫获取初始化数据
        this.route.data.subscribe(resp => {
            this.dataViewModule = resp.dataViewResolver.result;
            this.dataViewModule.columns = resp.dataViewResolver.result.columns;
            this.buttons = resp.dataViewResolver.result.buttons;
            this.dataFilters = resp.dataViewResolver.result.dataFilters;
            this.treeOptions = resp.dataViewResolver.result.treeOptions;
            this.options = resp.dataViewResolver.result.options;
            this.options.columns = resp.dataViewResolver.result.columns;
            var self  = this;
            this.options.queryParams = function (params) {
                params.treeOptions = self.treeOptions;
                return params;
            }
            this.options.onRefresh = function(params){
                params.treeOptions = self.treeOptions;
                return params;
            }
            this.ztree = this.buildzTree();
            this.createDatafilter();
        });
    }

    componentFactory(componentName) {
        var factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        var factoryClass = <Type<any>>factories.find((x: any) => x.name == componentName);
        return factoryClass;
    }

    navClick(button: Button) {
        switch (button.id) {
            case GoldbalConstant.CRUD.create:
                const modalRef = this.modalService.open(DataViewCreateComponent, { size: "lg" });
                modalRef.result.then((result) => {
                    this.toastr.success(result);
                    this.search();
                }, (reason) => { });
                modalRef.componentInstance.dataViewModule = this.dataViewModule;
                break;
            case GoldbalConstant.CRUD.update:
                let selected = this.getSelections();
                if(!selected){
                    return;
                }
                //获取主键
                this.httpService.doPost(Application.ubold_sm_fetch,

                    //TODO 主键不一定是id
                    { sqlId: this.dataViewModule.sqlId, id: selected[0].id }).subscribe(resp => {
                        if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.formViewResolver.code) {
                            const modalRef = this.modalService.open(DataViewCreateComponent, { size: "lg" });
                            modalRef.componentInstance.dataViewModule = this.dataViewModule
                            modalRef.componentInstance.viewModel = resp.result;
                            modalRef.result.then((result) => {
                                this.toastr.success(result);
                                this.search();
                            },(reason) => {});;
                        } else {
                            this.toastr.error(resp.message);
                        }
                    });
                break;
            case GoldbalConstant.CRUD.retrieve:

                break;
            case GoldbalConstant.CRUD.delete:

                break;
            default:
                break;
        }

        //根据按钮操作类型处理
        switch (button.option) {
            case GoldbalConstant.OPTIONS_BUTTON.service:

                break;
            case GoldbalConstant.OPTIONS_BUTTON.modal:
                  const modalRef = this.modalService.open(this.componentFactory(button.modal), { size: "lg" })
                  .result.then((result) => {},(reason) => {});
                break;
            case GoldbalConstant.OPTIONS_BUTTON.window:
                break;
            default:
                break;
        }
    }
}