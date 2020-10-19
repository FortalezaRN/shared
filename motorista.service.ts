import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ApiRequestOptions } from '../models/request-options.model';
import { environment } from 'src/environments/environment';

interface Motorista {
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  constructor(
    private apiClient: ApiClientService,
    private http: HttpClient
  ) { }

  inserir(motorista: any, success: Function, formGroup: FormGroup) {

    var options = new ApiRequestOptions(motorista, success);
    options.formGroup = formGroup;
    this.apiClient.post(environment.apiMain, 'api/motoristatask/registrar-motorista-web', options);
  }

  getById(id: any, success: Function) {

  }

  excluir(idmotorista: any, success: Function) {
    
  }
  getAll (success: Function){
    var options = new ApiRequestOptions(null, success);
    this.apiClient.get(environment.apiMain, 'api/MotoristaQuery', options);
  }
  getAllPositions (success: Function, idEmpresa){
    var options = new ApiRequestOptions({idEmpresa}, success);
    this.apiClient.get(environment.apiMain, 'api/GeolocalizacaoQuery', options);
  }
}
