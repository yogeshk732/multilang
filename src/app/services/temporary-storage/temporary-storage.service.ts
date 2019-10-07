import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemporaryStorageService {

  dataObj = [];
  constructor() { }

  set(key, data) {
    this.dataObj[key] = data;
  }

  get(key) {
    return this.dataObj[key];
  }

  clear(key) {
    delete this.dataObj[key];
  }

}
