import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { Application } from "../../metadata/constant/application.constant";
import { DataViewModule, TreeModule, FuncButton } from "../../metadata/sm/dataViewModule.md";
import { FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Options } from "../../metadata/ngb/ngbGrid/options.md";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { GUID } from "../../utils/guid.util";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DictConstant } from "../../metadata/constant/dict.constant";
import { ColumnMoreComponent } from "./columnMore.component";
import { NgbModalOptions } from "../../../node_modules/._@ng-bootstrap_ng-bootstrap@1.0.0-alpha.25@@ng-bootstrap/ng-bootstrap/modal/modal.module";
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
  updateTypes: Array<any> =  DictConstant.createUpdateTypes();
  orders: Array<any>
  fieldTypes: Array<any> = DictConstant.createfieldTypes();
  funcButtons:Array<any> = DictConstant.createFuncButtons();
  aligns: Array<any> = DictConstant.createAligns();
  valigns:Array<any> = DictConstant.createValigns();
  scopes: Array<any> = DictConstant.createScopes();

  //SQL 定义
  sqlDefines:Array<any> = this.createSqlDefines();
  
  //被过滤的sqldefine
  sqlDefineFields:Array<any>;

  //当前对应SQLDEFINE
  currentSqlDefineFields:Array<any>;
  
  @Input() dataViewId: string;

  constructor(private logger: LoggerService, private httpService: HttpService, private fb: FormBuilder,private modalService: NgbModal) { }
  ngOnInit() {
    this.createModule();
    this.buildForm();
  }

  ngAfterViewInit(): void {

  }

  //添加功能
  addFunc(id,title,type){
     let funcButton = new FuncButton(); 
     if(id){
       funcButton.id = id;
     }else{
       funcButton.id = GUID.createGUIDString();
     }
     funcButton.func = 0;
     funcButton.title = title;
     if(type != undefined){
      funcButton.type = type;
     }else{
      funcButton.type = 1;
     }
     this.formData.funcButtons.push(funcButton);
     const controls = <FormArray>this.ngbForm.controls['funcButtons'];
     controls.push(this.fb.group({
            id:[funcButton.id],
            func:[funcButton.func,[Validators.required]],
            icon:[funcButton.icon],
            dialogSize:[funcButton.dialogSize],
            title:[funcButton.title,[Validators.required,Validators.maxLength(50)]],
            url:[funcButton.url,[Validators.required]],
            type:[funcButton.type,[Validators.required]]
        }));
  }

  //选中功能按钮
 checkFunc(id){
     const formArray = <FormArray>this.ngbForm.controls['funcButtons'];
     for (var index = 0; index < formArray.length; index++) {
       let element = <FormGroup>formArray.controls[index];
        if(element.controls.id.value == id){
          formArray.removeAt(index)
          
          //移除
          return;
        }
     }

     //添加
     if("i" == id){
        this.addFunc("i","增加",1);
        return;
     }
     if("d" == id){
        
        //默认行内按钮
        this.addFunc("d","删除",0);
        return;
     }
     if("u" == id){
        this.addFunc("u","修改",1);
        return;
     }
     if("s" == id){
        this.addFunc("s","查询",1);
        return;
     }
 }

 //判断是否选中
 ischecked(id){
   const formArray = <FormArray>this.ngbForm.controls['funcButtons'];
     for (var index = 0; index < formArray.length; index++) {
       let element = <FormGroup>formArray.controls[index];
        if(element.controls.id.value == id){
          return true;
        }
     }
     return false;
 }

 //删除行
 removeControls(controls,idx){
   controls.removeAt(idx);
 }

//列更多设置
openMore(content){

  // 弹出组件
  // const modalRef = this.modalService.open(ColumnMoreComponent);
  // modalRef.componentInstance.columOptions = columOptions;
  
   this.modalService.open(content,{size:"lg"}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

//初始化树设置数据源
createSqlDefines(){
  let array = new Array<any>();
  return array;
}

//树sqldefine变更清空当前树内容
treeSqlDefineChange(){
       const formGroup = <FormGroup>this.ngbForm.controls['treeModule'];
       formGroup.setValue({idKey:"",pIdKey:"",name:""});
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

    let co = new ColumOptions();
    co.title ="e3";
    co.field = "ddd";
    this.formData.columns = new Array<any>();
    this.formData.columns.push(co);

    this.formData.treeModule = new TreeModule();
    this.formData.treeModule.isShow = false;
    this.formData.treeModule.scope = 'SELF';
    this.formData.treeModule.width = 2;
    this.formData.funcButtons = Array<FuncButton>();
  }

  //创建form
  buildForm(): void {
    this.treeFg = this.fb.group({
      isShow: [this.formData.treeModule.isShow],
      sqlId: [this.formData.treeModule.name],
      idKey: [this.formData.treeModule.idKey],
      name: [this.formData.treeModule.name],
      pIdKey: [this.formData.treeModule.pIdKey],
      scope: [this.formData.treeModule.scope],
      width: [this.formData.treeModule.width],
      relationField: [this.formData.treeModule.relationField]
    });

    //options fromGroup
    this.optionsFg = this.fb.group({
      url: [this.formData.options.url, [Validators.required, Validators.maxLength(200)]],
      method: [this.formData.options.method, [Validators.required, Validators.maxLength(6)]],
      pagination: [this.formData.options.pagination],
      pageSize: [this.formData.options.pageSize, [Validators.required, Validators.maxLength(3)]],
      showExport: [this.formData.options.showExport],
      undefinedText:[this.formData.options.undefinedText],
      searchText:[this.formData.options.searchText],
      sortable:[this.formData.options.sortable]
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
      columns: this.fb.array(this.initColumns()),
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
        formatter: [columnOptions.formatter],
        footerFormatter: [columnOptions.footerFormatter],
        sortName: [columnOptions.sortName]
      }));
    })
    return formArray;
  }

  showTreeCheck() {
    // this.treeFg.controls.url.setValidators(Validators.required);
    this.formData = this.ngbForm.value;
    if (!this.formData.treeModule.isShow) {
      this.treeFg.controls.sqlId.setValidators(Validators.required);
      this.treeFg.controls.pIdKey.setValidators(Validators.required);
      this.treeFg.controls.relationField.setValidators(Validators.required);
      this.treeFg.controls.idKey.setValidators(Validators.required);
      this.treeFg.controls.scope.setValidators(Validators.required);
      this.treeFg.controls.width.setValidators(Validators.required);
    } else {
      this.treeFg.controls.sqlId.clearValidators();
      this.treeFg.controls.pIdKey.clearValidators();
      this.treeFg.controls.relationField.clearValidators();
      this.treeFg.controls.idKey.clearValidators();
      this.treeFg.controls.scope.clearValidators();
      this.treeFg.controls.width.clearValidators();
    }

    // this.ngbForm.controls.treeModule.updateValueAndValidity();
  }

  //提交表单
  onSubmit() {
    this.formData = this.ngbForm.value;
    alert(JSON.stringify(this.formData));
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