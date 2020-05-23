import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { ConnectedUser } from '../model/connected-user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../dto/user';
import { LoginResponse } from '../dto/LoginResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _tokenName = 'accessToken';
    private _userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;


    // User State
    connectedUser: ReplaySubject<ConnectedUser> = new ReplaySubject<ConnectedUser>();

    constructor(private http: HttpClient) { }

    loginUser(user: UserDto): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this._userLoginUrl, user);
    }

    setUserToken(token: string) {
        localStorage.setItem(this._tokenName, token);
    }

}
