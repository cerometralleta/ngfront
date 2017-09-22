import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
import { DataViewModule, TreeOptions, Button, DataFilter } from "../../metadata/sm/dataViewModule.md";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { GUID } from "../../utils/guid.util";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DictConstant } from "../../metadata/constant/dict.constant";
import { ButtonDialogComponent } from "./buttonDialog.component";
import { Mock } from "../../metadata/constant/mock.constant";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { Observable } from "../../../node_modules/._rxjs@5.3.1@rxjs/Observable";
import { DataViewResolver } from "../../resolver/sm/dataViewResolver";
import { Resolve, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "../../service/basic/toastr.service";
import { DataViewComponent } from "./dataView.component";
import { SelectorComponent } from "./selector.component";
import { FormVerifiyService } from "../../service/sm/formVerifiy.service";
declare var $: any;

@Component({
  selector: 'sm-dataViewEdit',
  templateUrl: './app/component/sm/dataViewEdit.component.html'
})
export class DataViewEditComponent implements OnInit {

  //form group
  ngbForm: FormGroup;
  formData: DataViewModule;
  formGroup: any;
  treeFromGroup: FormGroup;
  optionsFormGroup: FormGroup;
  // error info
  formErrors: Array<string>;
  updateTypes: Array<any> = DictConstant.createUpdateTypes();
  fieldTypes: Array<any> = DictConstant.createfieldTypes();
  buttons: Array<any> = DictConstant.createButtons();
  aligns: Array<any> = DictConstant.createAligns();
  valigns: Array<any> = DictConstant.createValigns();
  scopes: Array<any> = DictConstant.createScopes();
  expressions: Array<any> = DictConstant.createExpressions();
  methods: Array<any> = DictConstant.createMethods();
  locations: Array<any> = DictConstant.createLocation();
  sidePaginations: Array<any> = DictConstant.createSidePagination();
  createQueryParamsTypes: Array<any> = DictConstant.createQueryParamsType();
  exportDataType: Array<any> = DictConstant.createExportDataType();
  patterns :Array<any> = DictConstant.createPatterns();

  //SQL 定义
  sqlDefines: Array<any> = this.createSqlDefines();

  //ztree sqldefine fields
  ztreeSqlDefineFields: Array<any>;

  //当前对应SQLDEFINE,relationId字段
  currentSqlDefineFields: Array<any>;
  insert:boolean = false;

  constructor(private logger: LoggerService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private dataViewResolver: DataViewResolver,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService,
    private formVerifiyService: FormVerifiyService
  ) { }
  ngOnInit() {
    this.createModule();
    this.buildForm();
  }

  // 添加按钮
  openAdd() {
    // 弹出组件
    const modalRef = this.modalService.open(ButtonDialogComponent, { size: GoldbalConstant.modal_size_lg });
    modalRef.result.then((result) => {
        let button = <Button>result;
        this.formData.buttons.push(button);
        const controls = <FormArray>this.ngbForm.controls['buttons'];
        controls.push(this.fb.group({
          id: [button.id],
          option: [button.option],
          modal: [button.modal],
          size: [button.size],
          icon: [button.icon],
          title: [button.title, [Validators.required, Validators.maxLength(10)]],
          url: [button.url],
          location: [button.location, [Validators.required]],
          btnsize:[button.btnsize],
          color:[button.color]
        }));
      }, (reason) => {});
  }

  //添加功能
  addButton(button:Button) {
    // let button = new Button();
    if (!button.id) {
      button.id = GUID.createGUIDString();
    } 
    button.sort = 0;
    button.size = GoldbalConstant.modal_size_lg;
    this.formData.buttons.push(button);
    const controls = <FormArray>this.ngbForm.controls['buttons'];
    controls.push(this.fb.group({
      id: [button.id],
      option: [button.option, [Validators.required]],
      modal: [button.modal],
      size: [button.size],
      icon: [button.icon],
      title: [button.title, [Validators.required, Validators.maxLength(10)]],
      url: [button.url],
      location: [button.location, [Validators.required]],
      btnsize:[button.btnsize],
      color:[button.color]
    }));
  }

  //选中功能按钮
  checkFunc(id) {
    const formArray = <FormArray>this.ngbForm.controls['buttons'];
    for (var index = 0; index < formArray.length; index++) {
      let element = <FormGroup>formArray.controls[index];
      if (element.controls.id.value == id) {
        formArray.removeAt(index)

        //移除
        return;
      }
    }

    let btn = new Button();
    btn.id = id;
    btn.btnsize = "btn-xs";
    switch (id) {
      case GoldbalConstant.CRUD.create:
        btn.title ="增加";
        btn.color = "btn-default";
        btn.location =  GoldbalConstant.LOCATION.nav;
        btn.option = GoldbalConstant.OPTIONS_BUTTON.modal;
        break;
      case GoldbalConstant.CRUD.delete:
        btn.title ="删除";
        btn.color = "btn-danger";
        btn.location =  GoldbalConstant.LOCATION.row;
        btn.option = GoldbalConstant.OPTIONS_BUTTON.service;
        break;
      case GoldbalConstant.CRUD.update:
        btn.title ="修改";
        btn.color = "btn-warning";
        btn.location =  GoldbalConstant.LOCATION.row;
        btn.option = GoldbalConstant.OPTIONS_BUTTON.modal;
        break;
      case GoldbalConstant.CRUD.retrieve:
        btn.title ="查看";
        btn.color = "btn-info";
        btn.location =  GoldbalConstant.LOCATION.row;
        btn.option = GoldbalConstant.OPTIONS_BUTTON.modal;
        break;
      default:
        break;
    }
    this.addButton(btn);
  }

  //判断是否选中
  ischecked(id) {
    const formArray = <FormArray>this.ngbForm.controls['buttons'];
    for (var index = 0; index < formArray.length; index++) {
      let element = <FormGroup>formArray.controls[index];
      if (element.controls.id.value == id) {
        return true;
      }
    }
    return false;
  }

  //删除行
  removeControls(controls, idx) {
    controls.removeAt(idx);
  }

  // 设置按钮类型
  openOption(content) {
    const modalRef =  this.modalService.open(ButtonDialogComponent, { size: GoldbalConstant.modal_size_lg });
    modalRef.componentInstance.formGroup = content;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //列更多设置
  openMore(content) {
    this.modalService.open(content, { size: GoldbalConstant.modal_size_lg }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //初始化树设置数据源
  createSqlDefines() {
    let array = new Array<any>();
    return array;
  }

  //ztree 数据源
  openZtreeSqlDefine() {
    //查询sqldefine
    this.httpService.doPost(Application.ubold_sm_sqldefine_selector, null)
      .subscribe(resp => {
        //TODO  查询sql define
        if (GoldbalConstant.STATUS_CODE.SUCCESS != resp.code) {
          this.toastr.error("选择器数据获取异常,请检查视图编号:DV10000000000001");
          return;
        }
        const modalRef = this.modalService.open(SelectorComponent, { size: GoldbalConstant.modal_size_lg });
        modalRef.componentInstance.dataViewModule = resp.result;
        modalRef.result.then((result) => {
          const _treeFormGroup = <FormGroup>this.ngbForm.controls['treeOptions'];
          let _selectedSqlId = result[0].sqlId;

          if (_selectedSqlId == _treeFormGroup.controls.sqlId.value) {
            return;
          }
          _treeFormGroup.controls.sqlId.setValue(_selectedSqlId);

          //clear idKey,pIdkey name field
          _treeFormGroup.controls.idKey.setValue("");
          _treeFormGroup.controls.pIdKey.setValue("");
          _treeFormGroup.controls.name.setValue("");

          //刷新sqldefine fields
          this.refreshZtreeSqlIdFields(_selectedSqlId);
        }, (reason) => { });
      });
  }

  //ztree sqldefine 
  refreshZtreeSqlIdFields(sqlId) {
    this.httpService.doPost(Application.ubold_sqldefine_createColumnList + sqlId, null)
      .subscribe(resp => {
        if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
          //刷新ztree关系字段
          this.ztreeSqlDefineFields = resp.result;
        } else {
          this.toastr.error(resp.messages)
        }
      });
  }

  //创建页面数据
  createModule() {

    //监控路由守卫获取初始化数据
    this.route.data.subscribe(resp => {
      if (resp.dataViewResolver) {
        this.formData = resp.dataViewResolver.result;
      } else {
        this.insert = true;
        this.formData = new DataViewModule();
        this.formData.columns = new Array<any>();
        this.formData.dataFilters = new Array<any>();
        this.formData.buttons = new Array<any>();

        //options
        this.formData.options = new Options();
        this.formData.options.method = "post";
        this.formData.options.pagination = true;
        this.formData.options.pageSize = 50;
        this.formData.options.sortable = true;
        this.formData.options.showToggle = true;
        this.formData.options.smartDisplay = true;
        this.formData.options.searchTimeOut = 3;
        this.formData.options.showHeader = true;
        this.formData.options.showColumns = true;
        this.formData.options.showRefresh = true;
        this.formData.options.sidePagination = "server";
        this.formData.options.queryParamsType = "undefined";
        this.formData.options.pageNumber = 1;
        this.formData.options.checkboxHeader = false;
        this.formData.options.maintainSelected = true;
        this.formData.options.exportDataType = "basic";
        this.formData.options.version = "version";
        // this.formData.options.idField = "id";

        //tree
        this.formData.treeOptions = new TreeOptions();
        this.formData.treeOptions.show = false;
        this.formData.treeOptions.width = 2;
        this.formData.treeOptions.enable = true;
        this.formData.treeOptions.scope = GoldbalConstant.TREE_OPTIONS[0].value;
      }
      //ztree关系字段
      this.currentSqlDefineFields = this.formData.columns;

    });
  }

  //创建form
  buildForm(): void {
    this.createTreeGroup();
    this.createOptionsFormGroup();

    this.formGroup = {
      id: [this.formData.id],
      version: [this.formData.version],
      dataViewCode: [this.formData.dataViewCode, [
        Validators.required,
        Validators.maxLength(30)]
      ],
      dataViewName: [this.formData.dataViewName, [
        Validators.required,
        Validators.maxLength(32)]
      ],
      sqlId: [this.formData.sqlId, [
        Validators.required,
        Validators.maxLength(50)]
      ],
      remark: [this.formData.remark, Validators.maxLength(250)],
      options: this.optionsFormGroup,
      columns: this.fb.array(this.createColumnsFormArray()),
      treeOptions: this.treeFromGroup,
      buttons: this.fb.array(this.createbuttonsFormArray()),
      dataFilters: this.fb.array(this.createDataFilterFormArray())
    };
    this.ngbForm = this.fb.group(this.formGroup);
    this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //创建树
  createTreeGroup() {
    this.treeFromGroup = this.fb.group({
      show: [this.formData.treeOptions.show],
      sqlId: [this.formData.treeOptions.sqlId],
      idKey: [this.formData.treeOptions.idKey],
      name: [this.formData.treeOptions.name],
      pIdKey: [this.formData.treeOptions.pIdKey],
      scope: [this.formData.treeOptions.scope],
      width: [this.formData.treeOptions.width],
      enable: [this.formData.treeOptions.enable],
      relationField: [this.formData.treeOptions.relationField]
    });

    //refresh ztree
    if (this.formData.treeOptions.sqlId) {
      this.refreshZtreeSqlIdFields(this.formData.treeOptions.sqlId);
    }
  }

  createOptionsFormGroup() {
    //options fromGroup
    this.optionsFormGroup = this.fb.group({
      url: [this.formData.options.url, [Validators.maxLength(200)]],
      method: [this.formData.options.method, [Validators.required, Validators.maxLength(6)]],
      pagination: [this.formData.options.pagination],
      pageSize: [this.formData.options.pageSize, [Validators.required, Validators.maxLength(3)]],
      pageNumber: [this.formData.options.pageNumber],
      showExport: [this.formData.options.showExport],
      exportDataType: [this.formData.options.exportDataType],
      undefinedText: [this.formData.options.undefinedText],
      searchText: [this.formData.options.searchText],
      sortable: [this.formData.options.sortable],
      sortStable: [this.formData.options.sortStable],
      // sortName: [this.formData.options.sortName],
      dataField: [this.formData.options.dataField],
      totalField: [this.formData.options.totalField],
      selectItemName: [this.formData.options.selectItemName],
      smartDisplay: [this.formData.options.smartDisplay],
      escape: [this.formData.options.escape],
      search: [this.formData.options.search],
      searchOnEnterKey: [this.formData.options.searchOnEnterKey],
      strictSearch: [this.formData.options.strictSearch],
      searchTimeOut: [this.formData.options.searchTimeOut],
      trimOnSearch: [this.formData.options.trimOnSearch],
      showHeader: [this.formData.options.showHeader],
      showFooter: [this.formData.options.showFooter],
      cardView: [this.formData.options.cardView],
      showColumns: [this.formData.options.showColumns],
      showRefresh: [this.formData.options.showRefresh],
      showPaginationSwitch: [this.formData.options.showPaginationSwitch],
      idField: [this.formData.options.idField,[Validators.required]],
      version:[this.formData.options.version,[Validators.required]],
      uniqueId: [this.formData.options.uniqueId],
      detailView: [this.formData.options.detailView],
      clickToSelect: [this.formData.options.clickToSelect],
      singleSelect: [this.formData.options.singleSelect],
      showToggle: [this.formData.options.showToggle],
      sidePagination: [this.formData.options.sidePagination],
      queryParamsType: [this.formData.options.queryParamsType],
      checkboxHeader: [this.formData.options.checkboxHeader],
      maintainSelected: [this.formData.options.maintainSelected]
    });
  }

  // 创建查询条件
  createDataFilterFormArray() {
    let formArray = new Array<any>();
    this.formData.dataFilters.forEach(dataFilter => {
      formArray.push(this.fb.group({
        title: [dataFilter.title],
        field: [dataFilter.field],
        fieldType: [dataFilter.fieldType],
        dataType: [dataFilter.dataType, [Validators.required]],
        expression: [dataFilter.expression, [Validators.required]],
        extensions: [dataFilter.extensions]
      })
      )
    });
    return formArray;
  }

  //创建按钮
  createbuttonsFormArray() {
    let formArray = new Array<any>();
    this.formData.buttons.forEach(button => {
      formArray.push(this.fb.group({
          id: [button.id],
          option: [button.option, [Validators.required]],
          modal: [button.modal],
          size: [button.size],
          icon: [button.icon],
          title: [button.title, [Validators.required, Validators.maxLength(10)]],
          url: [button.url],
          location: [button.location, [Validators.required]],
          btnsize: [button.btnsize],
          color:[button.color]
        })
      )
    });
    return formArray;
  }


  //创建列
  createColumnGroup(columnOptions) {
    return this.fb.group({
      field: [columnOptions.field, [Validators.required, Validators.maxLength(50)]],
      title: [columnOptions.title, [Validators.required, Validators.maxLength(50)]],
      updateType: [columnOptions.updateType, [Validators.required, Validators.maxLength(30)]],
      view: [columnOptions.view],
      insert: [columnOptions.insert],
      visible: [columnOptions.visible],
      dataType: [columnOptions.dataType, [Validators.maxLength(10)]],
      fieldType: [columnOptions.fieldType, [Validators.required, Validators.maxLength(30)]],
      maxlength: [columnOptions.maxlength],
      idx: [columnOptions.idx, [Validators.maxLength(10)]],
      align: [columnOptions.align, [Validators.maxLength(10)]],
      halign: [columnOptions.halign, [Validators.maxLength(10)]],
      falign: [columnOptions.falign, [Validators.maxLength(10)]],
      radio: [columnOptions.radio],
      checkbox: [columnOptions.checkbox],
      valign: [columnOptions.valign],
      width: [columnOptions.width],
      sortable: [columnOptions.sortable],
      order: [columnOptions.order],
      cardVisible: [columnOptions.cardVisible],
      switchable: [columnOptions.switchable],
      clickToSelect: [columnOptions.clickToSelect],
      formatter: [columnOptions.formatter],
      // footerFormatter: [columnOptions.footerFormatter],
      sortName: [columnOptions.sortName],
      searchable: [columnOptions.searchable],
      pattern:[columnOptions.pattern]
    })
  }

  //初始化列表组件
  createColumnsFormArray() {
    let formArray = new Array<any>();
    this.formData.columns.forEach(columnOptions => {
      formArray.push(this.createColumnGroup(columnOptions));
    })
    return formArray;
  }

  //根据SQLID生成列
  createColumnList() {
    this.httpService.doPost(Application.ubold_sqldefine_createColumnList + this.ngbForm.value.sqlId, null)
      .subscribe(resp => {
        if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
          let dataList = resp.result;

          //刷新ztree关系字段
          this.currentSqlDefineFields = resp.result;

          //刷新过滤器列,其实可以不用刷新
          this.formData.columns = resp.result;

          //清空数据过滤
          this.clearDatafilter();
          const formArray = <FormArray>this.ngbForm.controls['columns'];
          //清空现在有的视图字段列表
          this.clearColumns();

          //重新赋值
          for (var index = 0; index < dataList.length; index++) {
            formArray.push(this.createColumnGroup(dataList[index]));
          }
          this.toastr.success("字段列表更新成功");
        } else {
          this.toastr.error(resp.messages)
        }
      });
  }

  //清空现有的视图字段
  clearColumns() {
    const formArray = <FormArray>this.ngbForm.controls['columns'];
    //先清空,倒序删除数组
    for (var idx = formArray.length; idx >= 0; idx--) {
      formArray.removeAt(idx);
    }
  }

 showTreeCheck() {
    // this.treeFromGroup.controls.url.setValidators(Validators.required);
    this.formData = this.ngbForm.value;
    if (!this.formData.treeOptions.show) {
      for (let key in this.treeFromGroup.controls) {
        this.treeFromGroup.controls[key].setValidators(Validators.required);
        this.treeFromGroup.controls[key].updateValueAndValidity();
      }
    } else {
      for (let key in this.treeFromGroup.controls) {
        this.treeFromGroup.controls[key].clearValidators();
        this.treeFromGroup.controls[key].updateValueAndValidity();
      }
    }
  }

  //filterSelected
  filterSelected(column) {
    let datafilter = new DataFilter();
    // datafilter.id = GUID.createGUIDString();
    let control = column.controls;
    datafilter.dataType = control.dataType._value;
    datafilter.fieldType = control.fieldType._value;
    datafilter.field = control.field._value;
    datafilter.title = control.title._value;
    datafilter.expression = '=';
    const controls = <FormArray>this.ngbForm.controls['dataFilters'];
    controls.push(this.fb.group({
      title: [datafilter.title, [Validators.required]],
      field: [datafilter.field],
      dataType: [datafilter.dataType],
      fieldType: [datafilter.fieldType, [Validators.required, Validators.maxLength(50)]],
      expression: [datafilter.expression],
      extensions: [datafilter.extensions]
    }));
  }

  //清空datafilter
  clearDatafilter() {
    const controls = <FormArray>this.ngbForm.controls['dataFilters'];
    for (var idx = controls.length; idx >= 0; idx--) {
      controls.removeAt(idx);
    }
  }


  // 查询sql define
  openSelector() {

    //查询sqldefine
    this.httpService.doPost(Application.ubold_sm_sqldefine_selector, null)
      .subscribe(resp => {
        //TODO  查询sql define
        if (GoldbalConstant.STATUS_CODE.SUCCESS != resp.code) {
          this.toastr.error("选择器数据获取异常,请检查视图编号:DV10000000000001");
          return;
        }
        const modalRef = this.modalService.open(SelectorComponent, { size: GoldbalConstant.modal_size_lg });
        modalRef.componentInstance.dataViewModule = resp.result;
        modalRef.result.then((result) => {
          let _selectedValue = result[0];
          if (_selectedValue.sqlId == this.ngbForm.controls.sqlId.value) {
            return;
          }

          //返回的sqlId
          this.ngbForm.controls.sqlId.setValue(_selectedValue.sqlId);

          //更新默认数据请求地址
          this.optionsFormGroup.controls.url.setValue("/" + _selectedValue.sqlId);

          //设置默认主键
          if (_selectedValue.masterTableId) {
            this.optionsFormGroup.controls.idField.setValue(_selectedValue.masterTableId);
            this.optionsFormGroup.controls.uniqueId.setValue(_selectedValue.masterTableId);
          }

          //清空生成的列
          this.clearColumns();
          this.clearDatafilter();
        }, (reason) => { });
      });
  }


  //提交表单
  onSubmit() {
    this.formData = this.ngbForm.value;
    this.httpService.doPost(Application.ubold_sm_persistent, this.formData)
      .subscribe(resp => {
        if (GoldbalConstant.STATUS_CODE.SUCCESS == resp.code) {
          this.toastr.success(resp.message);
          this.cancel();
        } else {
          this.toastr.error(resp.message);
        }
      });
  }

  cancel() {
    this.router.navigate(['home', 'dataviewlist']);
  }

  //变更
  onValueChanged(data?: any) {
    if (!this.ngbForm) { return; }
    this.formErrors = this.formVerifiyService.formVerifiy(this.ngbForm, data);

  }
}