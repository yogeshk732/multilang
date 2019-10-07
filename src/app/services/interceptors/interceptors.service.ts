import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';
import { environment } from '@env/environment';

import { unautherizedUrl } from '@route/unautherized.route-url';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Get the auth token from the service.
    const authToken = this.auth.getToken();
    const getUser = this.auth.getUser();

    let unAutherizedPath = unautherizedUrl;

    unAutherizedPath = unAutherizedPath.filter(obj => {
      return environment.api_path + obj === req.url;
    });

    if (!unAutherizedPath || (unAutherizedPath && unAutherizedPath.length <= 0)) {

      const request = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken, login_id: getUser['_id'] } });

      return next.handle(request);
    } else {
      // send cloned request with header to the next handler.
      return next.handle(req);
    }


  }
}
