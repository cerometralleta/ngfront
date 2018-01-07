import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorage } from '../storage/local.storage';
import { FrameConstants } from '../constants/FrameConstants';

@Injectable()
export class HttpService {

    constructor(public http: Http, public jsonp: Jsonp, private ls: LocalStorage) { }

    addRequestOptions(params?) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.ls.get(FrameConstants.Authorization)
         });
        const requestOptions = new RequestOptions({headers: headers});
        requestOptions.params = params;
        return requestOptions;
    }

    // http.get
    doGet(url, params) {
        return this.http.get(url, this.addRequestOptions(params)).map(result => result.json());
    }

    doGetResp(url, params) {
        return this.http.get(url, this.addRequestOptions(params)).map(result => result);
    }

    // http.post
    doPost(url, params) {
        return this.http.post(url, params, this.addRequestOptions()).map(result => result.json());
    }

    doPostResp(url, params) {
        return this.http.post(url, params, this.addRequestOptions()).map(result => result);
    }
    // jsonp
    jsonpGet(url, params) {
        return this.jsonp.get(url, this.addRequestOptions(params)).map(result => result.json());
    }
}