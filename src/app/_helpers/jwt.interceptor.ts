import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.userValue;
        const isLoggedIn = user && user['token'];
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        // to handle no jwt in some urls
        const index = environment.publicApiUrl.findIndex((elem) => elem.url === request.url);
        const isPublicUrl = environment.publicApiUrl[index];
        let methodPublic = false;
        if (isPublicUrl){
          if (isPublicUrl.method === request.method){
            methodPublic = true;
          }
        }

        if (isLoggedIn && isApiUrl && !methodPublic) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user['token']}`
                }
            });
        }
        return next.handle(request);
    }
}
