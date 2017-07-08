import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
import { DataViewModule, TreeModule, FuncButton } from "../../metadata/sm/dataViewModule.md";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
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
  treeFg: FormGroup;
  optionsFg: FormGroup;
  funcButtonFg:FormGroup;
  // error info
  formErrors: Array<string>;
  updateTypes: Array<any>;
  orders: Array<any>
  fieldTypes: Array<any>;
  funcButtons:Array<any>;
  aligns: Array<any>;
  valigns: Array<any>;
  scopes: Array<any>;
  @Input() dataViewId: string;

  constructor(private logger: LoggerService, private httpService: HttpService, private fb: FormBuilder) { }
  ngOnInit() {
    this.createModule();
    this.buildForm();
    this.getUpdateTypes();
    this.getAligns();
    this.getValigns();
    this.getOrders();
    this.getfieldTypes();
    this.getScopes();
  }

  ngAfterViewInit(): void {

  }

  addFunc(){
     let funcButton = new FuncButton();
     this.formData.funcButtons.push(funcButton);
     this.ngbForm.controls.funcButtons.updateValueAndValidity();
  }
  createModule() {
    if (this.dataViewId && this.dataViewId != null) {
      return;
    }
    this.formData = new DataViewModule();
    this.formData.options = new Options();
    this.formData.options.method = 'POST';
    this.formData.options.pagination = false;
    this.formData.options.showExport = false;
    this.formData.options.pageSize = 50;
    this.formData.options.pageNumber = 1;
    this.formData.options.columns = new Array<any>();
    this.formData.treeModule = new TreeModule();
    this.formData.treeModule.isShow = false;
    this.formData.treeModule.nodeOpts = 'SELF';
    this.formData.treeModule.width = 2;
    this.formData.funcButtons = Array<FuncButton>();
  }

  //创建form
  buildForm(): void {

    this.treeFg = this.fb.group({
      isShow: [this.formData.treeModule.isShow],
      url: [this.formData.treeModule.name],
      idKey: [this.formData.treeModule.idKey],
      name: [this.formData.treeModule.name],
      pIdKey: [this.formData.treeModule.pIdKey],
      nodeOpts: [this.formData.treeModule.nodeOpts],
      width: [this.formData.treeModule.width],
      relationField: [this.formData.treeModule.relationField]
    });

    this.optionsFg = this.fb.group({
      url: [this.formData.options.url, [Validators.required, Validators.maxLength(30)]],
      method: [this.formData.options.method, [Validators.required, Validators.maxLength(30)]],
      // contentType: [this.formData.options.contentType,[Validators.required, Validators.maxLength(30)]],
      // dataType: [this.formData.options.dataType],
      pagination: [this.formData.options.pagination],
      pageSize: [this.formData.options.pageSize, [Validators.required, Validators.maxLength(30)]],
      // showHeader: [this.formData.options.showHeader,[Validators.required, Validators.maxLength(30)]],
      showExport: [this.formData.options.showExport],
      columns: this.fb.array(this.initColumns())
    });

    this.formGroup = {
      dataViewCode: [this.formData.dataViewCode, [
        Validators.required,
        Validators.maxLength(30)]
      ],
      dataViewName: [this.formData.dataViewName, [
        Validators.required,
        Validators.maxLength(32)]
      ],
      sqlid: [this.formData.sqlid, [
        Validators.required,
        Validators.maxLength(50)]
      ],
      remark: [this.formData.remark, Validators.maxLength(250)],
      options: this.optionsFg,
      treeModule: this.treeFg,
      funcButtons: this.fb.array(this.initFuncButtons())
    };
    this.ngbForm = this.fb.group(this.formGroup);
    this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  //初始化按钮
  initFuncButtons(){
    let formArray = new Array<any>();
    this.formData.funcButtons.forEach(funcButton => {
      formArray.push(this.fb.group({
            func:[funcButton.func,[Validators.required]],
            icon:[funcButton.icon],
            dialogSize:[funcButton.dialogSize],
            title:[funcButton.title,[Validators.required,Validators.maxLength(50)]],
            url:[funcButton.url,[Validators.required]],
            type:[funcButton.type,[Validators.required]]
        })
      )});
      return formArray;
  }

  //初始化列表组件
  initColumns() {
    let formArray = new Array<any>();
    this.formData.options.columns.forEach(columnOptions => {
      formArray.push(this.fb.group({
        // id: [columnOptions.id, [Validators.required, Validators.maxLength(32)]],
        // dataViewId: [columnOptions.dataViewId, [Validators.required, Validators.maxLength(32)]],
        field: [columnOptions.field, [Validators.required, Validators.maxLength(50)]],
        title: [columnOptions.title, [Validators.required, Validators.maxLength(50)]],
        updateType: [columnOptions.updateType, [Validators.required, Validators.maxLength(30)]],
        isView: [columnOptions.isView],
        isInsert: [columnOptions.isInsert],
        visible: [columnOptions.visible],
        dataType: [columnOptions.dataType, [Validators.maxLength(10)]],
        fieldType: [columnOptions.fieldType, [Validators.required, Validators.maxLength(30)]],
        maxlength: [columnOptions.maxlength],
        align: [columnOptions.align, [Validators.maxLength(10)]],
        halign: [columnOptions.halign, [Validators.maxLength(10)]],
        falign: [columnOptions.falign, [Validators.maxLength(10)]],
        idx: [columnOptions.idx, [Validators.maxLength(10)]],
        // lastUpdateTime: [columnOptions.lastUpdateTime],
        // lastUpdateUser: [columnOptions.lastUpdateUser],
        // version: [columnOptions.version],
        // createUser: [columnOptions.createUser],
        // createTime: [columnOptions.createTime],
        radio: [columnOptions.radio],
        checkbox: [columnOptions.checkbox],
        valign: [columnOptions.valign],
        width: [columnOptions.width],
        sortable: [columnOptions.sortable],
        order: [columnOptions.order],
        formatter: [columnOptions.formatter],
        footerFormatter: [columnOptions.footerFormatter],
        sortName: [columnOptions.sortName]
      }));
    })
    return formArray;
  }

  //修改方式
  getUpdateTypes() {
    this.updateTypes = new Array<any>();
    this.updateTypes.push({ code: 0, text: "隐藏" });
    this.updateTypes.push({ code: 1, text: "显示" });
    this.updateTypes.push({ code: 2, text: "禁用" });
  }

  //修改方式
  getOrders() {
    this.orders = new Array<any>();
    this.orders.push({ code: "ASC", text: "ASC" });
    this.orders.push({ code: "DESC", text: "DESC" });
  }

  getAligns() {
    this.aligns = new Array<any>();
    this.aligns.push({ code: "center", text: "居中" });
    this.aligns.push({ code: "right", text: "居右" });
    this.aligns.push({ code: "left", text: "居左" });
  }

  getValigns() {
    this.valigns = new Array<any>();
    this.valigns.push({ code: "middle", text: "居中" });
    this.valigns.push({ code: "top", text: "顶部" });
    this.valigns.push({ code: "bottom", text: "底部" });
  }

  getfieldTypes() {
    this.fieldTypes = new Array<any>();
    this.fieldTypes.push({ code: "text", text: "text" });
    this.fieldTypes.push({ code: "checkbox", text: "checkbox" });
    this.fieldTypes.push({ code: "downdrop", text: "downdrop" });
    this.fieldTypes.push({ code: "textarea", text: "textarea" });
  }

  getFuncButtons(){
    this.funcButtons = new Array<any>();
    this.funcButtons.push({ code: 0, text: "service" });
    this.funcButtons.push({ code: 1, text: "dialog" });
    this.funcButtons.push({ code: 2, text: "window" });
  }
  getScopes() {
    this.scopes = new Array<any>();
    this.scopes.push({ code: "ALL", text: "全部子节点" });
    this.scopes.push({ code: "CHILD", text: "子节点" });
    this.scopes.push({ code: "SELF", text: "当前节点" });
  }

  showTreeCheck() {
    // this.treeFg.controls.url.setValidators(Validators.required);
    this.formData = this.ngbForm.value;
    if (!this.formData.treeModule.isShow) {
      this.treeFg.controls.url.setValidators(Validators.required);
      this.treeFg.controls.pIdKey.setValidators(Validators.required);
      this.treeFg.controls.relationField.setValidators(Validators.required);
      this.treeFg.controls.idKey.setValidators(Validators.required);
      this.treeFg.controls.name.setValidators(Validators.required);
      this.treeFg.controls.width.setValidators(Validators.required);
    } else {
      this.treeFg.controls.url.clearValidators();
      this.treeFg.controls.pIdKey.clearValidators();
      this.treeFg.controls.relationField.clearValidators();
      this.treeFg.controls.idKey.clearValidators();
      this.treeFg.controls.name.clearValidators();
      this.treeFg.controls.width.clearValidators();
    }

    // this.ngbForm.controls.treeModule.updateValueAndValidity();
  }

  //提交表单
  onSubmit() {
    this.formData = this.ngbForm.value;
    // alert(this.formData.treeModule.isShow);
  }

  //变更
  onValueChanged(data?: any) {
    alert(21)
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

    for (const field in this.optionsFg.controls) {

      //get control
      const control = this.optionsFg.get(field);
      if (control && control.dirty && !control.valid) {

        //control.errors required,minlength
        for (const key in control.errors) {

          //错误信息..
          this.formErrors.push(`${field}` + messages[key]);

        }
      }
    }

    //tree valid
    for (const field in this.treeFg.controls) {

      //get control
      const control = this.treeFg.get(field);
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