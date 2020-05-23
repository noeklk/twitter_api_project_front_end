import { Injectable } from '@angular/core';
import { UserDto } from '../dto/user';
import { LoginResponseModel } from '../model/login-response';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _userLoginUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.user.login}`;

  constructor(private http: HttpClient) { }

  LoginUser(user: UserDto): Promise<HttpResponse<LoginResponseModel>> {
    const res = this.http.post<LoginResponseModel>(this._userLoginUrl, user, { observe: 'response' }).toPromise();
    return res;
  }
}
