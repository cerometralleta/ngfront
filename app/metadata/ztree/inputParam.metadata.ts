/**
 * zTree 输入
 */
import { Setting } from "./setting.metadata";

export class InputParam {
    constructor(setting:Setting,nodes:any) {
        this.nodes = nodes;
        this.setting = setting;
    }
    setting:Setting;//配置 
    nodes:any;//树数据
}