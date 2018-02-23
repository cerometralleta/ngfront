import { Application } from '../../sm/constant/application.constant';
import { FrameConstants } from '../constants/FrameConstants';
export class CommonUtils {
    constructor() {}

    // 优先处理url
    // tslint:disable-next-line:member-ordering
    static urlConvert(url: string, backupUrl: string): string{
        if (url) {
            if (url.indexOf('http') < 0 && url.indexOf('https') < 0){
                url = Application.baseContext +  url;
            }else{
                return url;
            }
        }
        return backupUrl;
    }

    /**
     * 判断json array的元素是否包含elementKey
     * @param elementKey
     * @param list
     */
    // tslint:disable-next-line:member-ordering
    static comprise(elementKey: string, list: Array<any>){
        list.forEach(data => {
            if (data.hasOwnProperty(elementKey)){
                return true;
            }
        });
        return false;
    }

    // 返回一个bootatrap header token
    static getAjaxTokenHeader(token) {
         // 设置Authorization
         return {headers: this.getAjaxToken2Header(token)};
    }

    static getAjaxToken2Header(token) {
        // 设置Authorization
        return  {'Authorization' : token};
   }
}