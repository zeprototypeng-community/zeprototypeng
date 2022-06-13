import { Injectable } from "@angular/core";
import { IControl } from "../dynamic-form/dynamic-form.component";

@Injectable({
    providedIn: 'root'
})
export class InputService {

    constructor() { }

    /**
     * check if a control is require or not
     * @param controlConfig 
     * @returns 
     */
    public isRequired(controlConfig: IControl): boolean {
        let response = false;
        controlConfig.rules.map((value) => {
            if (value.rule === 'required' && value.value === true) {
                response = true;
            }
        })

        return response;
    }

    public getClass(_class: string, otherClass?: string) {
        otherClass = otherClass ? otherClass : '';
        return _class ? _class + ' ' + otherClass : 'clr-col-12 ' + otherClass;
    }


}