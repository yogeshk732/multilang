import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageCookieService {

  constructor(private cookie: CookieService) { }
  private prefix = environment.app_name;

  public setCookie(value, key) {
    key = `${this.prefix}-${key}`;
    this.cookie.put(key, value, environment.cookiesOptions);
  }

  public getCookie(key) {
    key = `${this.prefix}-${key}`;
    return this.cookie.get(key);
  }

  public setCookies(obj: Object, key) {
    key = `${this.prefix}-${key}`;
    this.cookie.putObject(key, obj, environment.cookiesOptions);
  }

  public getCookies(key) {
    key = `${this.prefix}-${key}`;
    return this.cookie.getObject(key);
  }

  public removeCookie(key) {
    key = `${this.prefix}-${key}`;
    this.cookie.remove(key);
  }

  public removeAll() {
    this.cookie.removeAll();
  }

}
