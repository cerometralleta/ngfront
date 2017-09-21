import { Application } from "../metadata/constant/application.constant";

export class CommonUtils {
    constructor() {}

    //优先处理url
    static urlConvert(url:string,backupUrl:string):string{
        if (url) {
            if(url.indexOf("http") < 0 && url.indexOf("https") < 0){
                url = Application.baseContext +  url;
            }else{
                return url;
            }
        }
        return backupUrl;
    }
}