import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/basic/http.service';
import { LoggerService } from '../../service/basic/logger.service';
import { DictConstant } from '../../metadata/constant/dict.constant';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from '../../metadata/sm/dataViewModule.md';
import { GUID } from '../../utils/guid.util';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GoldbalConstant } from '../../metadata/constant/global.constant';
import { Pattern } from '../../metadata/sm/pattern.md';
import { CommonUtils } from '../../utils/common.util';
import { BaseComponent } from '../base.component';
import { FormVerifiyService } from '../../service/sm/formVerifiy.service';
@Component({
    selector: 'sm-pattern',
    templateUrl: './pattern.component.html'
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
    // 规则
    patterns: Array<Pattern> = [];
    selectedPatterns: Array<Pattern> = [];

    // 自定义规则
    definePatterns: Array<Pattern> = [];
    @Input() formGroup: any;
    ngOnInit() {
        // 初始化默认规则
        this.defaultPatterns();
        if (this.formGroup){
            const testJson = '{"email":"Email格式不正确","[0-9]+":"只能填整数","[A-Za-z]+":"只能填英文","ABC":"ABC TIP"}';
            const rules =  JSON.parse(testJson);
            // tslint:disable-next-line:forin
            for (const item in rules){
                this.checkboxSelected(item, rules[item]);
            }
        }
        //默认规则
        const patternfa = new Array<FormGroup>(); 
        this.patterns.forEach(pattern => {
            patternfa.push(this.fb.group({
                tip: [pattern.tip],
                rule: [pattern.rule],
                checked: [pattern.checked]
            })
          )
        });

        // 自定义规则
        const definePatternsfa = new Array<FormGroup>(); 
        this.definePatterns.forEach(pattern => {
            definePatternsfa.push(this.fb.group({
                tip: [pattern.tip, Validators.required],
                rule: [pattern.rule, Validators.required],
                checked: [pattern.checked]
            })
          )
        });
        this.ngbForm = this.fb.group({
            defaultPatterns: this.fb.array(patternfa),
            definePatterns: this.fb.array(definePatternsfa)
        });

        // 默认defaultPatterns
        this.patternsControls.valueChanges.subscribe(values => {
            const selects: Array<Pattern> = [];
            values.forEach((selected: Pattern , i: number) => {
              // tslint:disable-next-line:no-unused-expression
              selected.checked === true && selects.push(this.patterns[i]);
            });
            this.selectedPatterns = selects;
          });
          this.ngbForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    get patternsControls () {
        return <FormArray>this.ngbForm.get('defaultPatterns');
    }

    get patternsControlsByControls () {
        return this.patternsControls.controls;
    }

    get definePatternsControls () {
        return <FormArray>this.ngbForm.get('definePatterns');
    }

    get definePatternsByControls () {
        return this.definePatternsControls.controls;
    }

    defaultPatterns(){
        this.patterns.push(new Pattern('必填', 'required', false));
        this.patterns.push(new Pattern('Email', 'email', false));
        this.patterns.push(new Pattern('只能填整数', '[0-9]+', false));
        this.patterns.push(new Pattern('只能填英文', '[A-Za-z]+', false));
    }

    addRule(){
        this.addDefinePatternsControls(new Pattern(null, null, false));
    }

    addDefinePatternsControls(pattern){
        this.definePatternsControls.push(this.fb.group({
            tip: [pattern.tip, [Validators.required]],
            rule: [pattern.rule, [Validators.required, Validators.pattern('[0-9]+')]]
          }));
    }

    removeControls(controls, idx) {
        controls.removeAt(idx);
    }
    checkboxSelected(ruleItem, tipItem){
        for (const item of this.patterns){
            if (item.rule === ruleItem){
                item.checked = true;
                this.selectedPatterns.push(new Pattern(tipItem, ruleItem, true));
                return;
            }
        }
        // 不匹配归类自定义
        this.definePatterns.push(new Pattern(tipItem, ruleItem, false));
    }

    onSubmit(){
        const lastPatternJson = {};
        this.selectedPatterns.forEach(item => {
            lastPatternJson[item.rule] = item.tip;
        });
        for(const item of this.definePatternsByControls){
            lastPatternJson[item.value.rule] = item.value.tip;
        }
        this.logger.debug(JSON.stringify(lastPatternJson));
    }
}

