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
import { BaseComponent } from '../base.component';
import { FormVerifiyService } from '../../service/sm/formVerifiy.service';
@Component({
    selector: 'sm-pattern',
    templateUrl: './app/component/sm/pattern.component.html'
    // styleUrls: ['./name.component.css']
})
export class PatternComponent extends BaseComponent {
    constructor(public activeModal: NgbActiveModal
        , private fb: FormBuilder
        , private logger: LoggerService
        , private httpService: HttpService
        , formVerifiyService: FormVerifiyService) {
            super(formVerifiyService);
         }
    
    //规则
    patterns:Array<Pattern> = [];
    selectedPatterns:Array<Pattern> = [];

    //自定义规则
    definePatterns:Array<Pattern> = [];
    @Input() formGroup:any;
    ngOnInit() {
        
        //初始化默认规则
        this.defaultPatterns();
        if(this.formGroup){
            let test = '[{"tip":"Email","rule":"email"},{"tip":"只能填整数","rule":"[0-9]+"},{"tip":"只能填英文","rule":"[A-Za-z]+"},{"tip":"日日日","rule":"333"},{"tip":"暂住证","rule":"444"}]'
            let rules =  JSON.parse(test);
            rules.forEach(item => {
                this.checkboxSelected(item);
            });
        }
        
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
                tip: [pattern.tip,Validators.required],
                rule: [pattern.rule,Validators.required],
                checked:[pattern.checked]
            })
          )
        });
        this.ngbForm = this.fb.group({
            defaultPatterns:this.fb.array(patternfa),
            definePatterns:this.fb.array(definePatternsfa)
        });

        //默认defaultPatterns
        this.patternsControls.valueChanges.subscribe(values => {
            let selects: Array<Pattern> = [];
            values.forEach((selected: Pattern ,i: number) => {
              selected.checked === true && selects.push(this.patterns[i])
            });
            this.selectedPatterns = selects;
          });
          this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    

    get patternsControls () {
        return this.ngbForm.get("defaultPatterns");
    }

    get definePatternsControls () {
        return <FormArray>this.ngbForm.get("definePatterns");
    }

    defaultPatterns(){
        this.patterns.push(new Pattern("必填","required",false));
        this.patterns.push(new Pattern("Email","email",false));
        this.patterns.push(new Pattern("只能填整数","[0-9]+",false));
        this.patterns.push(new Pattern("只能填英文","[A-Za-z]+",false));
    }

    addRule(){
        this.addDefinePatternsControls(new Pattern(null,null,false));
    }

    addDefinePatternsControls(pattern){
        this.definePatternsControls.push(this.fb.group({
            tip: [pattern.tip, [Validators.required]],
            rule: [pattern.rule, [Validators.required,Validators.pattern("[0-9]+")]]
          }));
    }

    removeControls(controls, idx) {
        controls.removeAt(idx);
    }
    
    checkboxSelected(rule){
        for(let item of this.patterns){
            if(item.rule == rule["rule"]){
                item.checked = true;
                this.selectedPatterns.push(new Pattern(item.tip, item.rule,true));
                return;
            }
        }

        //不匹配归类自定义
        this.definePatterns.push(new Pattern(rule["tip"], rule["rule"],false));
    }

    onSubmit(){
        let lastPatterns = [];
        this.selectedPatterns.forEach(item => {
            lastPatterns.push({tip:item.tip,rule:item.rule});
        });
        this.definePatternsControls.controls.forEach((item:FormGroup) => {
            lastPatterns.push({tip:item.controls.tip.value,rule:item.controls.rule.value});
        });
        this.logger.debug(JSON.stringify(lastPatterns));
    }
}

 