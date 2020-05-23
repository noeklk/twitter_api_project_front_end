import { Injectable } from '@angular/core';
import { UserDto } from '../dto/user';
import { LoginResponse } from '../dto/LoginResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;

  constructor(private http: HttpClient) { }

  loginUser(user: UserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this._userLoginUrl, user);
  }

}
