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

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  GetAllKeywordsByUserId(userId: string): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getAllKeywordsByUserIdUrl}/${userId}/keywords`,
      { headers: this.sessionService.GenerateAllTokensHeader(), observe: 'response' }).toPromise();
    return res;
  }
}
