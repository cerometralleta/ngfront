import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ColumOptions } from '../../ngb/metadata/ngbGrid/columnOptions.md';
import { LoggerService } from '../../frame/service/logger.service';
import { HttpService } from '../../frame/service/http.service';
import { Mock } from '../constant/mock.constant';


@Component({
    selector: 'sm-formViewEdit',
    templateUrl: './formViewEdit.component.html'
})

// 自定义表单渲染
export class FormViewEditComponent implements OnInit {
     // 将列表dataViewModule透传
    // @Input() dataViewModule:DataViewModule; 
    // @Input() id:string;
    ngbForm: FormGroup;

    // 操作列
    columns: Array<ColumOptions>;
    // 视图数据
    viewModel: any;
    constructor(
    // public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private logger: LoggerService,
    private httpService: HttpService) {
    }
    ngOnInit() {
        // this.columns = this.dataViewModule.columns;
        this.columns = Mock.createColumn();
        this.viewModel = {name: 'aaaaa', sex: '男', remark: 'ffffffffffff'};
        this.ngbForm = new FormGroup(this.createFormGroup());

        // 根据id查询数据

        // 遍历列表生成编辑字段

        // 保存数据

    }

    onSubmit(){
        console.info(JSON.stringify(this.ngbForm.value))
    }

    createFormGroup(){
        const fg = {};
        this.columns.forEach(element => {
            // fg[element.field] = new FormControl(this.viewModel[element.field], <any>Validators.required),
            fg[element.field] = new FormControl(this.viewModel[element.field]);
        });
        return fg;
    }
}