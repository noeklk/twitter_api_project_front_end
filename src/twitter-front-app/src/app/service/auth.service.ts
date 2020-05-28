import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageModel } from '../model/message';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dto/user';
import { LoginResponseModel } from '../model/login-response';
import { TwitterService } from './twitter.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _tokenCheckUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.token_check}`;
    private _userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;
    private _userSignupUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.register}`;


    private _tokenName = 'accessToken';
    private _userIdName = 'userId';

    public isLoggedIn = false;
    public isTwitterAuthenticated = false;

    constructor(private myRoute: Router, private http: HttpClient, private twitterService: TwitterService) { }

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

    GetUserId(): string {
        return localStorage.getItem(this._userIdName) ? localStorage.getItem(this._userIdName) : 'no_user';
    }

    CheckToken(): Promise<HttpResponse<MessageModel>> {
        const res = this.http.get<MessageModel>(this._tokenCheckUrl, { observe: 'response' }).toPromise();
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

    LoginUser(user: UserDto): Promise<HttpResponse<LoginResponseModel>> {
        const res = this.http.post<LoginResponseModel>(this._userLoginUrl, user, { observe: 'response' }).toPromise();
        return res;
    }

    SignupUser(user: UserDto): Promise<HttpResponse<MessageModel>> {
        const res = this.http.post<MessageModel>(this._userSignupUrl, user, { observe: 'response' }).toPromise();
        return res;
    }

    Logout() {
        localStorage.removeItem(this._tokenName);
        localStorage.removeItem(this._userIdName);
        localStorage.removeItem('oauthAccessToken');
        localStorage.removeItem('oauthAccessTokenSecret');
        this.isLoggedIn = false;
        this.isTwitterAuthenticated = false;

        // Invalidating the token
        this.twitterService.invalidateToken().subscribe(
            res => console.log('token invalidé'),
            err => console.log(err)
        );

        console.log('Déconnecté!');
        this.myRoute.navigate(['login']);
    }
}
