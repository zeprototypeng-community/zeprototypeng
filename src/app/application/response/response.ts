import { User } from "src/app/application/models/user";
import { _isDefined } from "src/app/core/util/type-utils";

export class PaginateResponse {
    data: any[] = [];
    total: number = 0;
    from: number;
    to: number;
    per_page: number;
    current_page: number;
    last_page: number;

    constructor(model?: Object) {
        if (_isDefined(model)) {
            this.data = [model];
        }
    }
}

interface ILoginData {
    authenticated: boolean;
    double_auth_enabled: boolean;
    token: string;
}

export interface ILoginResponse {
    user: User;
    login_response: ILoginData;
}

export interface IDefaultResponse {
    success: boolean;
    code: number;
    body: IDefaultResponseBody
}

interface IDefaultResponseBody {
    error_message: string;
    errors: string[];
    response_data: any | PaginateResponse | ILoginResponse;
}

export function getResponseData(param: IDefaultResponse): any {
    return param.body.response_data;
}

export function getResponseState(param: IDefaultResponse): boolean {
    return param.success;
}

export function getResponseCode(param: IDefaultResponse): number {
    return param.code;
}

export function getResponseAuthState(param: IDefaultResponse): boolean {
    return (param.body.response_data as ILoginResponse).login_response != undefined ? 
    (param.body.response_data as ILoginResponse).login_response.authenticated : 
    null;
}