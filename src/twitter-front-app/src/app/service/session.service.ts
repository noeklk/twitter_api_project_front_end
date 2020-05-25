import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private http: HttpClient) { }

    getRedirectUrl() {
        return this.http.get(`${environment.nodejs_api_host}sessions/connect`);
    }

    saveAccessToken(oauthToken: string, oauthVerifier: string) {
        console.log('Sauvegarde des tokens dans le back');
        return this.http.get(`${environment.nodejs_api_host}sessions/saveAccessTokens?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`);
    }

    GenerateAccessTokenHeader(): HttpHeaders {
        const accessToken = localStorage.getItem('oauthAccessToken');
        const accessTokenSecret = localStorage.getItem('oauthAccessTokenSecret');

        return new HttpHeaders({
            AccessToken: accessToken,
            AccessTokenSecret: accessTokenSecret
        });
    }
}
