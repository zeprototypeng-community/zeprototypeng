import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { forkJoin, Observable } from "rxjs";
import { forms } from "src/app/application/forms/forms";
import { getResponseData } from "src/app/application/response/response";
import { HttpRequestService } from "../../http/http-request.service";
import { _isDefined } from "../../util/type-utils";
import { IControl, Iform, IItem, InputType } from "../dynamic-form/dynamic-form.component";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor(private fb: FormBuilder, private client: HttpRequestService) { }

    /**
     * get form config
     * 
     * @param id 
     */
    async getForm(id: number): Promise<Iform> {
        let form = forms.find((v) => v.id === id);
        form.controls = form.controls.sort((a, b) => a.index - b.index);
        form = await this.getRemoteData(form);

        return form;
    }

    /**
     * build formGroup
     * 
     * @param controlConfigs 
     */
    getFormGroup(controlConfigs: IControl[]): FormGroup {
        if (controlConfigs.length > 0) {
            let group = this.fb.group({});

            controlConfigs.forEach(controlConfig => {
                if (controlConfig.type === InputType.TEXT ||
                    controlConfig.type === InputType.NUMBER ||
                    controlConfig.type === InputType.PASSWORD ||
                    controlConfig.type === InputType.EMAIL ||
                    controlConfig.type === InputType.PASSWORD ||
                    controlConfig.type === InputType.TEXTAREA ||
                    controlConfig.type === InputType.DATE ||
                    controlConfig.type === InputType.RADIO ||
                    controlConfig.type === InputType.HIDDEN
                ) {
                    const value = controlConfig.value ? controlConfig.value : '';
                    const rules = this.getRules(controlConfig);
                    group.addControl(controlConfig.name, new FormControl(value, rules));
                }

                if (controlConfig.type === InputType.CHECKBOX) {
                    const rules = this.getRules(controlConfig);
                    // const checkboxGroup = this.fb.group({});
                    // controlConfig?.items?.forEach((item) => {
                    //     checkboxGroup.addControl(item?.name, new FormControl(item.value));
                    // })
                    // checkboxGroup.addValidators(rules)
                    const value = controlConfig.value ? controlConfig.value : false;
                    group.addControl(controlConfig.name, new FormControl(value, rules));
                }

                if (controlConfig.type === InputType.SELECT) {
                    const value = controlConfig.items;
                    const rules = this.getRules(controlConfig);
                    group.addControl(controlConfig.name, new FormControl(value, rules));
                }


                if (controlConfig.type === InputType.ARRAY) {
                    const formArray = this.fb.array([]);
                    const formArrayGoup = this.fb.group({});
                    controlConfig?.childreen.forEach((child) => {
                        formArrayGoup.addControl(child.name, new FormControl(child.value, this.getRules(child)));
                    })
                    formArray.push(formArrayGoup);
                    group.addControl(controlConfig.name, formArray);
                }
            });
            // console.log(group)
            return group;
        }
        return null;
    }

    getFormGroupWithData(controlConfig: IControl, data: any): FormGroup {
        let group = this.fb.group({});
        if (controlConfig.type === InputType.ARRAY) {
            controlConfig?.childreen.forEach((child) => {
                if (_isDefined(child.value))
                    if (_isDefined(child.value.value))
                        child.value.value = data[child.name];
                    else
                        child.value = data[child.name];
                const rules = this.getRules(child, group);
                group.addControl(child.name, new FormControl(child.value, rules));
            });
        }
        return group;
    }

    /**
     * get Validators
     * @param controlConfig
     * @returns
     */
    private getRules(controlConfig: IControl, formGroup?: FormGroup): ValidatorFn[] {
        let rules: ValidatorFn[] = [];
        if (controlConfig?.rules && controlConfig.rules.length > 0) {
            controlConfig.rules.forEach((r) => {
                let value = r.value;
                if (r.value?.name && formGroup)
                    value = formGroup.controls[(r.value.name)].value;
                    
                if (r.rule === 'required') {
                    rules.push(Validators.required);
                }
                if (r.rule === 'min') {
                    rules.push(Validators.min(value));
                }
                if (r.rule === 'max') {
                    rules.push(Validators.max(value));
                }
                if (r.rule === 'minLength') {
                    rules.push(Validators.minLength(value));
                }
                if (r.rule === 'maxLength') {
                    rules.push(Validators.maxLength(value));
                }
                if (r.rule === 'email') {
                    rules.push(Validators.email);
                }
            })
        }
        if (controlConfig?.patterns && controlConfig.patterns.length > 0) {
            controlConfig.patterns.forEach((p: string | RegExp) => {
                rules.push(Validators.pattern(p));
                // console.log(Validators.pattern(p), p);
            })
        }
        // console.log(rules)
        return rules;
    }

    private async getRemoteData(form: Iform): Promise<Iform> {
        let _form = form;
        let requests: Observable<any>[] = [];
        let controls: IControl[] = [];
        form.controls.forEach((control) => {
            if (control.remote) {
                if (control.type === InputType.SELECT) {
                    controls.push(control);
                    requests.push(this.client.get(control.remote.url));
                }
            }

            /* added by Joël, for children that you forget ☻ */
            control.childreen?.forEach((control) => {
                if (control.remote) {
                    if (control.type === InputType.SELECT) {
                        controls.push(control);
                        requests.push(this.client.get(control.remote.url));
                    }
                }
            })
        })

        let dataFromRequests = await forkJoin(requests).toPromise();
        if (dataFromRequests) {
            dataFromRequests.forEach((data, index) => {
                form.controls.map((control) => {
                    if (control.remote && control.type === InputType.SELECT) {
                        if (control.name == controls[index].name) {
                            control.items = this.getRemoteItems(data, control)
                        }
                    }

                    /* added by Joël, for children that you forget ☻ */
                    control.childreen?.forEach((control) => {
                        if (control.remote && control.type === InputType.SELECT) {
                            if (control.name == controls[index].name) {
                                control.items = this.getRemoteItems(data, control)
                            }
                        }
                    })
                })
            })
        }
        return _form;
    }

    /**
     * build items array
     * 
     * @param data 
     * @param control 
     * @returns 
     */
    private getRemoteItems(data: any, control: IControl): IItem[] {
        let _data = getResponseData(data);
        let items: IItem[] = [];
        _data.forEach((element: any[]) => {
            let item: IItem = {
                value: element[control.remote.fields.value],
                label: control.remote.fields.object ?
                    element[control.remote.fields.object][control.remote.fields.label] :
                    element[control.remote.fields.label],
            }
            items.push(item);
        });
        return items;
    }
}