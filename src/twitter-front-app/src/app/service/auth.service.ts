import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ConnectedUserModel } from '../model/connected-user';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageModel } from '../model/message';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _tokenCheckUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.token_check}`;

    private _tokenName = 'accessToken';
    private _userIdName = 'userId';

    public isLoggedIn = false;

    // User State
    connectedUser = new ReplaySubject<ConnectedUserModel>();

    testUser;

    constructor(private myRoute: Router, private http: HttpClient) { }

    GenerateHeader(): HttpHeaders {
        return new HttpHeaders({
            Authorization: this.GetToken()
        });
    }

    SetUserToken(token: string) {
        localStorage.setItem(this._tokenName, token);
    }

    GetToken(): string {
        return localStorage.getItem(this._tokenName);
    }

    HasToken(): boolean {
        return this.GetToken() != null;
    }

    SetUserId(id: string) {
        localStorage.setItem(this._userIdName, id);
    }

    GetUserId(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(localStorage.getItem(this._userIdName));
        });
    }

    CheckToken(): Promise<HttpResponse<MessageModel>> {
        const res = this.http.get<MessageModel>(this._tokenCheckUrl, { headers: this.GenerateHeader(), observe: 'response' }).toPromise();
        return res;
    }

    HasValidToken(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!this.HasToken()) {
                this.myRoute.navigate(['login']);
                console.log('you dont have any token, do try to log in first');
            } else {
                this.CheckToken().then((res: HttpResponse<MessageModel>) => {
                    console.log('nice you have a valid token, come on in !');
                    this.isLoggedIn = true;
                    return resolve(true);
                }).catch((error: HttpErrorResponse) => {
                    console.log('your token is not valid anymore, please reconnect');
                    this.Logout();
                    return reject(false);
                });
            }
        });
    }

    Logout() {
        localStorage.removeItem(this._tokenName);
        localStorage.removeItem(this._userIdName);
        this.isLoggedIn = false;
        console.log('Déconnecté!');
        this.myRoute.navigate(['login']);
    }
}
