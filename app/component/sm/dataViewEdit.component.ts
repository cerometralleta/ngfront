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
import { Resolve,ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'sm-dataViewEdit',
  templateUrl: './app/component/sm/dataViewEdit.component.html'
})
export class DataViewEditComponent implements OnInit, AfterViewInit {

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

  //SQL 定义
  sqlDefines: Array<any> = this.createSqlDefines();

  //被过滤的sqldefine
  sqlDefineFields: Array<any>;

  //当前对应SQLDEFINE
  currentSqlDefineFields: Array<any>;

  @Input() dataViewId: string;

  constructor(private logger: LoggerService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private dataViewResolver:DataViewResolver,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }
  ngOnInit() {
    this.createModule();
    this.buildForm();
  }

  ngAfterViewInit(): void {

  }

  // 添加按钮
  openAdd() {
    // 弹出组件
    const modalRef = this.modalService.open(ButtonDialogComponent, { size: "lg" });
    modalRef.result.then((result) => {
      console.info(JSON.stringify(result))
      let button = <Button>result;
      this.formData.buttons.push(button);
      const controls = <FormArray>this.ngbForm.controls['buttons'];
      controls.push(this.fb.group({
        id: [button.id],
        // option: [button.option, [Validators.required]],
        option: [button.option],
        window: [button.window],
        size: [button.size],
        icon: [button.icon],
        title: [button.title, [Validators.required, Validators.maxLength(50)]],
        url: [button.url, [Validators.required]],
        location: [button.location, [Validators.required]]
      }));
    }
      // , (reason) => {
      //      alert(1233)
      // }
    );
  }

  //添加功能
  addFunc(id, title, type) {
    let button = new Button();
    if (id) {
      button.id = id;
    } else {
      button.id = GUID.createGUIDString();
    }
    button.title = title;
    if (type != undefined) {
      button.location = type;
    } else {
      button.location = 'nav';
    }
    this.formData.buttons.push(button);
    const controls = <FormArray>this.ngbForm.controls['buttons'];
    controls.push(this.fb.group({
      id: [button.id],
      // option: [button.option, [Validators.required]],
      option: [button.option],
      window: [button.window],
      size: [button.size],
      icon: [button.icon],
      title: [button.title, [Validators.required, Validators.maxLength(50)]],
      url: [button.url, [Validators.required]],
      location: [button.location, [Validators.required]]
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

    //添加
    if ("i" == id) {
      this.addFunc("i", "增加", 1);
      return;
    }
    if ("d" == id) {

      //默认行内按钮
      this.addFunc("d", "删除", 0);
      return;
    }
    if ("u" == id) {
      this.addFunc("u", "修改", 1);
      return;
    }
    if ("s" == id) {
      this.addFunc("s", "查询", 1);
      return;
    }
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
    this.modalService.open(content, { size: "lg" }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //列更多设置
  openMore(content) {

    // 弹出组件
    // const modalRef = this.modalService.open(ColumnMoreComponent);
    // modalRef.componentInstance.columOptions = columOptions;

    this.modalService.open(content, { size: "lg" }).result.then((result) => {
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

  //树sqldefine变更清空当前树内容
  treeSqlDefineChange() {
    const formGroup = <FormGroup>this.ngbForm.controls['treeOptions'];
    formGroup.setValue({ idKey: "", pIdKey: "", name: "" });
  }


  //创建页面数据
  createModule() {
    if (this.dataViewId && this.dataViewId != null) {
      this.formData = new DataViewModule();
      this.formData.columns = new Array<any>();
      this.formData.dataFilters = new Array<any>();
      this.formData.buttons = new Array<any>();
      this.formData.options = new Options();
      this.formData.treeOptions = new TreeOptions();
      return;
    }

    //监控路由守卫获取初始化数据
    this.route.data.subscribe(resp=>{
       this.formData = resp.dataViewResolver.result;
    });
  }

  //创建form
  buildForm(): void {
    this.createTreeGroup();
    this.createOptionsFormGroup();

    this.formGroup = {
      id:[this.formData.id],
      version:[this.formData.version],
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
      relationField: [this.formData.treeOptions.relationField]
    });
  }

  createOptionsFormGroup() {
    //options fromGroup
    this.optionsFormGroup = this.fb.group({
      url: [this.formData.options.url, [Validators.maxLength(200)]],
      method: [this.formData.options.method, [Validators.required, Validators.maxLength(6)]],
      pagination: [this.formData.options.pagination],
      pageSize: [this.formData.options.pageSize, [Validators.required, Validators.maxLength(3)]],
      showExport: [this.formData.options.showExport],
      undefinedText: [this.formData.options.undefinedText],
      searchText: [this.formData.options.searchText],
      sortable: [this.formData.options.sortable],
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
      idField: [this.formData.options.idField],
      uniqueId: [this.formData.options.uniqueId],
      detailView: [this.formData.options.detailView],
      clickToSelect: [this.formData.options.clickToSelect],
      singleSelect: [this.formData.options.singleSelect],
      showToggle:[this.formData.options.showToggle]
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
        id:[button.id],
        option: [button.option, [Validators.required]],
        window: [button.window],
        size: [button.size],
        icon: [button.icon],
        title: [button.title, [Validators.required, Validators.maxLength(50)]],
        url: [button.url, [Validators.required]],
        location: [button.location, [Validators.required]]
      })
      )
    });
    return formArray;
  }

  //初始化列表组件
  createColumnsFormArray() {
    let formArray = new Array<any>();
    this.formData.columns.forEach(columnOptions => {
      formArray.push(this.fb.group({
        field: [columnOptions.field, [Validators.required, Validators.maxLength(50)]],
        title: [columnOptions.title, [Validators.required, Validators.maxLength(50)]],
        updateType: [columnOptions.updateType, [Validators.required, Validators.maxLength(30)]],
        isView: [columnOptions.isView],
        isInsert: [columnOptions.isInsert],
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
        // formatter: [columnOptions.formatter],
        // footerFormatter: [columnOptions.footerFormatter],
        sortName: [columnOptions.sortName]
      }));
    })
    return formArray;
  }

  showTreeCheck() {
    // this.treeFromGroup.controls.url.setValidators(Validators.required);
    this.formData = this.ngbForm.value;
    if (!this.formData.treeOptions.show) {
      this.treeFromGroup.controls.sqlId.setValidators(Validators.required);
      this.treeFromGroup.controls.pIdKey.setValidators(Validators.required);
      this.treeFromGroup.controls.relationField.setValidators(Validators.required);
      this.treeFromGroup.controls.idKey.setValidators(Validators.required);
      this.treeFromGroup.controls.scope.setValidators(Validators.required);
      this.treeFromGroup.controls.width.setValidators(Validators.required);
    } else {
      this.treeFromGroup.controls.sqlId.clearValidators();
      this.treeFromGroup.controls.pIdKey.clearValidators();
      this.treeFromGroup.controls.relationField.clearValidators();
      this.treeFromGroup.controls.idKey.clearValidators();
      this.treeFromGroup.controls.scope.clearValidators();
      this.treeFromGroup.controls.width.clearValidators();
    }

    // this.ngbForm.controls.treeOptions.updateValueAndValidity();
  }

  //filterSelected
  filterSelected(column) {
    let datafilter = new DataFilter();
    // datafilter.id = GUID.createGUIDString();
    datafilter.dataType = column.dataType;
    datafilter.fieldType = column.fieldType;
    datafilter.field = column.field;
    datafilter.title = column.title;
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

  // 查询sql define
  openWindow() {

    //TODO  查询sql define

  }

  //提交表单
  onSubmit() {
    this.formData = this.ngbForm.value;
    this.httpService.http.post(Application.ubold_sm_persistent, this.formData)
      .subscribe(res => {

        //处理响应
        alert(JSON.stringify(res.json()));
      });


    console.info(JSON.stringify(this.formData))
  }

  //变更
  onValueChanged(data?: any) {
    if (!this.ngbForm) { return; }

    let messages = {
      'required': '为必填',
      'minlength': '长度不足',
      'maxlength': '长度超出范围'
    };

    //是否清空message ??
    this.formErrors = new Array<string>();
    //group data
    for (const field in this.formGroup) {

      //get control
      const control = this.ngbForm.get(field);
      if (control && control.dirty && !control.valid) {

        //control.errors required,minlength
        for (const key in control.errors) {

          //错误信息..
          this.formErrors.push(`${field}` + messages[key]);

        }
      }
    }

    for (const field in this.optionsFormGroup.controls) {

      //get control
      const control = this.optionsFormGroup.get(field);
      if (control && control.dirty && !control.valid) {

        //control.errors required,minlength
        for (const key in control.errors) {

          //错误信息..
          this.formErrors.push(`${field}` + messages[key]);

        }
      }
    }

    //tree valid
    for (const field in this.treeFromGroup.controls) {

      //get control
      const control = this.treeFromGroup.get(field);
      if (control && control.dirty && !control.valid) {

        //control.errors required,minlength
        for (const key in control.errors) {

          //错误信息..
          this.formErrors.push(`${field}` + messages[key]);

        }
      }
    }

  }
}