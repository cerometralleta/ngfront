import { Injectable } from '@angular/core';
import { Http, Jsonp } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {

    constructor(public http: Http, public jsonp: Jsonp) { }

    // http.get
    doGet(url, params) {
        return this.http.get(url, params).map(result => result.json());
    }
    
    doGetResp(url, params) {
        return this.http.get(url, params).map(result => result);
    }

    // http.post
    doPost(url, params) {
        return this.http.post(url, params).map(result => result.json());
    }

    doPostResp(url, params) {
        return this.http.post(url, params).map(result => result);
    }
    // jsonp
    jsonpGet(url, params) {
        return this.jsonp.get(url, params).map(result => result.json());
    }
}