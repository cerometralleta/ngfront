import { Component, OnInit, Input } from '@angular/core';
import { DataViewModule } from "../../metadata/sm/dataViewModule.md";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LoggerService } from "../../service/basic/logger.service";
import { HttpService } from "../../service/basic/http.service";
import { ColumOptions } from "../../metadata/ngb/ngbGrid/columnOptions.md";
import { Mock } from "../../metadata/constant/mock.constant";

@Component({
    selector: 'sm-dataViewCreate',
    templateUrl: './app/component/sm/dataViewCreate.component.html'
})
// dataView create/update
export class DataViewCreateComponent implements OnInit {

    //将列表dataViewModule透传
    // @Input() dataViewModule:DataViewModule; 
    // @Input() id:string;
    
    ngbForm: FormGroup;

    //操作列
    columns:Array<ColumOptions>;

    //视图数据
    viewModel:any;
    
    constructor(
    // public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private logger: LoggerService,
    private httpService: HttpService) { 

    }
    
    ngOnInit() { 
        // this.columns = this.dataViewModule.columns;
        this.columns = Mock.createColumn();
        this.viewModel = {name:"aaaaa",sex:"男",remark:"ffffffffffff"};
        this.ngbForm = new FormGroup(this.createFormGroup());

        // 根据id查询数据

        // 遍历列表生成编辑字段

        //保存数据

    }

    onSubmit(){
        console.info(JSON.stringify(this.ngbForm.value))
    }
    
    createFormGroup(){
        let fg = {};
        this.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),
            fg[element.field] = new FormControl(this.viewModel[element.field]);
        });
        return fg;
    }
 
}