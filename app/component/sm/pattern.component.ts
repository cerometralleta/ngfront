import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { DictConstant } from "../../metadata/constant/dict.constant";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from "../../metadata/sm/dataViewModule.md";
import { GUID } from "../../utils/guid.util";
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { GoldbalConstant } from "../../metadata/constant/global.constant";
import { Pattern } from '../../metadata/sm/pattern.md';
import { CommonUtils } from '../../utils/common.util';
@Component({
    selector: 'sm-pattern',
    templateUrl: './app/component/sm/pattern.component.html'
    // styleUrls: ['./name.component.css']
})
export class PatternComponent implements OnInit {
    ngbForm: FormGroup;
    constructor(public activeModal: NgbActiveModal
        , private fb: FormBuilder
        , private logger: LoggerService, private httpService: HttpService) { }
    
    //规则
    patterns:Array<Pattern> = [];

    //自定义规则
    definePatterns:Array<Pattern> = [];
    @Input() formGroup:any;
    ngOnInit() {
        if(this.formGroup){}
        
        //初始化默认规则
        this.defaultPatterns();

        //默认规则
        let patternfa = new Array<FormGroup>(); 
        this.patterns.forEach(pattern => {
            patternfa.push(this.fb.group({
                tip: [pattern.tip],
                rule:[pattern.rule],
                checked:[pattern.checked]
            })
          )
        });

        //自定义规则
        let definePatternsfa = new Array<FormGroup>(); 
        this.definePatterns.forEach(pattern => {
            definePatternsfa.push(this.fb.group({
                tip: [pattern.tip],
                rule: [pattern.rule],
                checked:[pattern.checked]
            })
          )
        });
        this.ngbForm = this.fb.group({
            defaultPatterns:this.fb.array(patternfa),
            definePatterns:this.fb.array(definePatternsfa)
        });

        //默认patterns 
        this.patternsControls.valueChanges.subscribe(values => {
            let selects: Array<Pattern> = [];
            values.forEach((selected: Pattern ,i: number) => {
              selected.checked === true && selects.push(this.patterns[i])
            });
            this.patterns = selects;
          });
    }

    get patternsControls () {
        return this.ngbForm.get("defaultPatterns");
    }

    defaultPatterns(){
        this.patterns.push(new Pattern("required","required",false));
        this.patterns.push(new Pattern("email","email",false));
        this.patterns.push(new Pattern("数字","[0-9]+",false));
        this.patterns.push(new Pattern("字母","[A-Za-z]+",false));
    }

    checkboxSelected(value:string){
       return CommonUtils.comprise(value,this.patterns);
    }

    confirm(){

    }
}

 