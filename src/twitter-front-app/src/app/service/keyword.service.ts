import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session.service';
import { Injectable } from '@angular/core';
import { KeywordModel } from '../model/keyword';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  private _getAllKeywordsByUserIdUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_all_keywords_by_id_user}`;
  private _getKeywordsByUserIdAndKeywordUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_keywords_by_id_user_and_keyword}`;

  constructor(private http: HttpClient, private sessionService: SessionService, private authService: AuthService) { }

  GetAllKeywordsByUserId(): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getAllKeywordsByUserIdUrl}/${this.authService.GetUserId()}/keywords`,
      { headers: this.sessionService.GenerateAllTokensHeader(), observe: 'response' }).toPromise();
    return res;
  }

  GetKeywordByIdUserAndKeyword(keyword: string): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getKeywordsByUserIdAndKeywordUrl}/${this.authService.GetUserId()}/keywords/${keyword}`,
      { headers: this.sessionService.GenerateAllTokensHeader(), observe: 'response' }).toPromise();
    return res;
  }
}
