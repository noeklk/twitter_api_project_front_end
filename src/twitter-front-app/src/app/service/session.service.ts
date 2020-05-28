import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../model/access-tokens';
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor(private http: HttpClient) { }

    GetRedirectUrl(): Promise<HttpResponse<any>> {
        return this.http.get<any>(`${environment.nodejs_api_host}${environment.nodejs_api_route.session.connect}`).toPromise();
    }

    SaveAccessToken(oauthToken: string, oauthVerifier: string): Promise<HttpResponse<AccessTokenModel>> {
        console.log('Sauvegarde des tokens dans le back');
        return this.http.get<AccessTokenModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.session.save_access_tokens}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`, { observe: 'response' }).toPromise();
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
