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

  private _getAllKeywordsKeywordUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_all_keywords_by_keyword}`;

  constructor(private http: HttpClient) { }

  GetAllKeywordsByKeyword(keyword: string): Promise<HttpResponse<KeywordModel[]>> {
    const res = this.http.get<KeywordModel[]>(`${this._getAllKeywordsKeywordUrl}/${keyword}`, { observe: 'response' }).toPromise();

    return res;
  }
}
