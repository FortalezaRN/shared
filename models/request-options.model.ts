import { FormGroup } from "@angular/forms";

export class ApiRequestOptions {

    params: any;
    successCallback: Function;
    headers: any;
    errorCallback: Function;
    formGroup: FormGroup;

    constructor(
        params?: any,
        successCallback?: Function,
        headers?: any,
        errorCallback?: Function,
        formGroup?: FormGroup) {
        this.params = params;
        this.successCallback = successCallback;
        this.headers = headers;
        this.errorCallback = errorCallback;
        this.formGroup = formGroup;
    }
}