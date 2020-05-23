import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ConnectedUser } from '../model/connected-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _tokenName = 'accessToken';

    // User State
    connectedUser: ReplaySubject<ConnectedUser> = new ReplaySubject<ConnectedUser>();

    constructor() { }

    setUserToken(token: string) {
        localStorage.setItem(this._tokenName, token);
    }

}
