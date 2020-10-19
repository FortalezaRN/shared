import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { ApiClientService } from './api-client.service';
import { environment } from 'src/environments/environment';
import { ApiRequestOptions } from '../models/request-options.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;
  sindicato: boolean = false;
  user: any;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private apiClient: ApiClientService,
    private http: HttpClient
  ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = this.store.getItem('Procity:authenticated');
    this.user = this.store.getItem('Procity:user');
    this.sindicato = this.store.getItem('Procity:sindicato');
  }

  getuser() {
    return this.user;
  }

  createSession(user: any) {
    this.authenticated = true;
    this.sindicato = user.sindicato;
    this.user = user;
    this.store.setItem('Procity:authenticated', true);
    this.store.setItem('Procity:sindicato', user.sindicato);
    this.store.setItem('Procity:user', user);
  }

  basicSignin(login: string, senha: string, successCallback: Function, errorCallback: Function) {

      this.http.post(environment.apiAuth + 'api/AutenticacaoTask/signin', {
        login: login,
        senha: senha,
        uUid: 'Web (N/A)',
        userAgent: 'Web (N/A)',
        so: 'Web (N/A)',
        versao: 'Web (N/A)',
        marca: 'Web (N/A)',
        modelo: 'Web (N/A)',
      })
        .toPromise()
        .then(result => {
          successCallback(result);
        })
        .catch(error => { 
          errorCallback(error);
        });
  }

  signout() {
    this.authenticated = false;
    this.store.setItem('Procity:authenticated', false);
    this.store.setItem('Procity:sindicato', false);
    this.store.setItem('Procity:user', null);
    this.router.navigateByUrl('/sessions/signin', {skipLocationChange: true});
  }
}
