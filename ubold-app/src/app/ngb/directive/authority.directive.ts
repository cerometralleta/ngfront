import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LocalStorage } from '../../frame/storage/local.storage';
import { FrameConstants } from '../../frame/constants/FrameConstants';

@Directive({ selector: '[appAuthority]'})
export class AuthorityDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private localStorage: LocalStorage) { }
    authority: any;
    @Input() set appAuthority(condition: string) {
        this.authority = JSON.parse(this.localStorage.get(FrameConstants.AUTHORITY));
        const flag = (this.authority[condition] && this.authority[condition] !== '');
        if (flag) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else{
            this.viewContainer.clear();
        }
    }
}