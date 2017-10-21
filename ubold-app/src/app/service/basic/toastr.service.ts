import { Injectable } from '@angular/core';
declare var toastr: any;

@Injectable()
export class ToastrService {

    constructor() {

    }

    info(info){
        toastr.options = {'positionClass': 'toast-bottom-right'};
        toastr.info(info);
    }

    error(info){
        toastr.options = {'positionClass': 'toast-bottom-right'};
        toastr.error(info);
    }

    warning(info){
        toastr.options = {'positionClass': 'toast-bottom-right'};
       toastr.warning(info);
    }

    success(info){
        toastr.options = {'positionClass': 'toast-bottom-right'};
        toastr.info(info);
    }

}