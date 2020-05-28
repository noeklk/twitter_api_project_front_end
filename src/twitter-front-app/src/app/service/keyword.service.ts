import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { KeywordModel } from '../model/keyword';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  private _getAllKeywordsByUserIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_all_keywords_by_id_user}`;
  private _getKeywordsByUserIdAndKeywordUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_keywords_by_id_user_and_keyword}`;

  constructor(private http: HttpClient, private sessionService: SessionService, private authService: AuthService) { }

  GetAllKeywordsByUserId(): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getAllKeywordsByUserIdUrl}/${this.authService.GetUserId()}/keywords`,
      { observe: 'response' }).toPromise();
    return res;
  }

  GetKeywordByIdUserAndKeyword(keyword: string): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getKeywordsByUserIdAndKeywordUrl}/${this.authService.GetUserId()}/keywords/${keyword}`,
      { observe: 'response' }).toPromise();
    return res;
  }
}
