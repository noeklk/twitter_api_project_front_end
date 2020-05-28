import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('oauthAccessToken') ? localStorage.getItem('oauthAccessToken') : '';
        const accessTokenSecret = localStorage.getItem('oauthAccessTokenSecret') ? localStorage.getItem('oauthAccessTokenSecret') : '';
        const authorization = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';

        const secureRequest = request.clone({
            headers: new HttpHeaders({
                authorization,
                accesstoken: accessToken,
                accesstokensecret: accessTokenSecret
            })
        });

        return next.handle(secureRequest);
    }
}
