import { AuthService } from 'src/app/service/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../model/access-tokens';
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private _getRedirectUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.connect}`;
    private _saveAccessTokenUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.session.save_access_tokens}`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    GetRedirectUrl(): Promise<HttpResponse<any>> {
        return this.http.get<any>(this._getRedirectUrl,
            { headers: this.authService.GenerateTokenHeader(), observe: 'response' }).toPromise();
    }

    SaveAccessToken(oauthToken: string, oauthVerifier: string): Promise<HttpResponse<AccessTokenModel>> {
        return this.http.get<AccessTokenModel>(`${this._saveAccessTokenUrl}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`,
            { headers: this.authService.GenerateTokenHeader(), observe: 'response' }).toPromise();
    }

    GenerateAllTokensHeader(): HttpHeaders {
        const accessToken = localStorage.getItem('oauthAccessToken');
        const accessTokenSecret = localStorage.getItem('oauthAccessTokenSecret');

        return new HttpHeaders({
            AccessToken: accessToken,
            AccessTokenSecret: accessTokenSecret,
            Authorization: this.authService.GetToken()
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
