import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../model/access-tokens';
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private http: HttpClient) { }

    getRedirectUrl() {
        return this.http.get(`${environment.nodejs_api_host}${environment.nodejs_api_route.session.connect}`);
    }

    saveAccessToken(oauthToken: string, oauthVerifier: string): Promise<HttpResponse<AccessTokenModel>> {
        console.log('Sauvegarde des tokens dans le back');
        return this.http.get<AccessTokenModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.session.save_access_tokens}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`, { observe: 'response' }).toPromise();
    }

    GenerateAccessTokenHeader(): HttpHeaders {
        const accessToken = localStorage.getItem('oauthAccessToken');
        const accessTokenSecret = localStorage.getItem('oauthAccessTokenSecret');

        return new HttpHeaders({
            AccessToken: accessToken,
            AccessTokenSecret: accessTokenSecret
        });
    }

    CheckAccessTokens(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem('oauthAccessToken') != null &&
                localStorage.getItem('oauthAccessTokenSecret') != null) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
}
