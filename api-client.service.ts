import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequestOptions } from '../models/request-options.model';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import { Utils } from '../utils';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  user: any;

  constructor(
    private http: HttpClient,
    private storage: LocalStoreService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.user = this.storage.getItem('Procity:user');
  }

  private defaultErrorHandler(error, options: ApiRequestOptions) {
    console.error(error);

    if (error.status === 401) {
      this.router.navigateByUrl('/sessions/signin');
      return;
    }

    if (error.status === 403) {

      this.router.navigateByUrl('others/erro', {
        state: {
          status: error.status,
          message: 'Desculpe, você não possui permissão para acessar esse recurso',
          ticket: '8ksrf83'
        }
      });

      return;
    }

    if (error.status === 422 || error.status === 400) {

      console.log(error);

      if (options.formGroup) {
        //this.toastr.success('Algo deu errado durante essa opera', 'Oops...', { timeOut: 3000 });
        Utils.dispatchErrors(options.formGroup, error.error.errorMessages);
        return;
      }   
    }

    this.router.navigateByUrl('others/erro', {
      state: {
        status: error.status,
        message: 'Um condição inesperada pela aplicação causou um erro durante sua requisição.',
        ticket: '8ksrf83'
      }
    });
  }

  private defaultSuccessHandler(result) {

  }

  request() {

  }

  get(baseUrl: string, action: string, options?: ApiRequestOptions) {

    let defaultHeaders: any = {};
    options = options || new ApiRequestOptions();

    if (this.user) {
      defaultHeaders.Authorization = `Bearer ${this.user.authToken}`;
      defaultHeaders.iid = this.user.iid || '-';
    }

    defaultHeaders = { ...defaultHeaders, ...options.headers };

    this.http.get(baseUrl + action, {
      headers: defaultHeaders,
      params: options.params
    })
      .toPromise()
      .then(result => {
        options.successCallback ? options.successCallback(result) : this.defaultSuccessHandler(result);
      })
      .catch(error => {
        options.errorCallback ? options.errorCallback(error) : this.defaultErrorHandler(error, options);
      });
  }

  post(baseUrl: string, action: string, options?: ApiRequestOptions) {

    let defaultHeaders: any = {};
    options = options || new ApiRequestOptions();

    if (this.user) {
      defaultHeaders.Authorization = `Bearer ${this.user.authToken}`;
      defaultHeaders.iid = this.user.iid || "-";
    }

    defaultHeaders = { ...defaultHeaders, ...options.headers };

    console.log(baseUrl + action, options.params, defaultHeaders);

    this.http.post(baseUrl + action, options.params, {
      headers: defaultHeaders
    })
      .toPromise()
      .then(result => {
        options.successCallback ? options.successCallback(result) : this.defaultSuccessHandler(result);
      })
      .catch(error => {
        options.errorCallback ? options.errorCallback(error) : this.defaultErrorHandler(error, options);
      });
  }
  put(baseUrl: string, action: string, options?: ApiRequestOptions) {

    let defaultHeaders: any = {};
    options = options || new ApiRequestOptions();

    if (this.user) {
      defaultHeaders.Authorization = `Bearer ${this.user.authToken}`;
      defaultHeaders.iid = this.user.iid || "-";
    }

    defaultHeaders = { ...defaultHeaders, ...options.headers };

    console.log(baseUrl + action, options.params, defaultHeaders);

    this.http.put(baseUrl + action, options.params, {
      headers: defaultHeaders
    })
      .toPromise()
      .then(result => {
        options.successCallback ? options.successCallback(result) : this.defaultSuccessHandler(result);
      })
      .catch(error => {
        options.errorCallback ? options.errorCallback(error) : this.defaultErrorHandler(error, options);
      });
  }

  datesToPtBr(result: any) {

    console.log(result);

    if (!result || !result.value)
      return;

    //Array 
    if (result.value.length) {
      console.log('iei.. array  ');
      result.value.forEach(element => {
        this.datesToPtBr({ value: element });
      });
      return;
    }

    //Object
    _.map(result.value, (v, key) => {
      var d = moment(v, 'YYYY-MM-DD');
      if (d.isValid()) {
        console.log(v, key, 'valid...');
        result.value[key] = d.format('DD/MM/YYYY')
      }
    });
  }

  datesFromPtBr(params: any) {

    if (typeof (params) !== 'object')
      return;

    //Object
    var newObj = {};
    _.map(params, (v, key) => {

      var d = moment(v, 'DDMMYYYY');
      if (d.isValid() && v.length == 8) {
        newObj[key] = d.format('YYYY-MM-DD')
      } else {
        newObj[key] = v;
      }
    });

    return newObj;
  }
}