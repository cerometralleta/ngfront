import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../service/basic/http.service";
import { LoggerService } from "../../service/basic/logger.service";
import { DictConstant } from "../../metadata/constant/dict.constant";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'sm-columnMore',
    templateUrl: './app/component/sm/columnMore.component.html'
    // styleUrls: ['./name.component.css']
})
export class ColumnMoreComponent implements OnInit {
    
    @Input() columnOptions;
    valigns: Array<any> = DictConstant.createValigns();
    constructor(public activeModal: NgbActiveModal,private logger: LoggerService,private httpService: HttpService) { }

    ngOnInit() { 
       
    }
}