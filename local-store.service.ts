import { Injectable } from '@angular/core';
import { v1 as uuidv1 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private ls = window.localStorage
  constructor() { }

  public setItem(key, value) {
    value = JSON.stringify(value)
    this.ls.setItem(key, value)
    return true
  }

  public getItem(key) {
    let value = this.ls.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      // console.log(e)
      return null
    }
  }

  public clear() {
    this.ls.clear();
  }

  public getDeviceUuid(){
    var uuid = this.getItem('device-id');

    if(!uuid) {
      uuid = uuidv1();
      this.setItem('device-id', uuid);
    }
    
    return uuid;
  }
}