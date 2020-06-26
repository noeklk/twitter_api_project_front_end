import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { KeywordModel } from '../model/keyword';
import { FilteredKeywordModel } from '../model/filtered-keyword';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  private _getAllKeywordsKeywordUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.keyword.get_all_keywords_by_keyword}`;

  constructor(private http: HttpClient) { }

  GetAllKeywordsByKeyword(keyword: string, filter?: string): Promise<HttpResponse<FilteredKeywordModel[]>> {
    const encodedKeyword = encodeURIComponent(keyword);
    let url = `${this._getAllKeywordsKeywordUrl}/${encodedKeyword}`;
    url = filter ? url + `?filter=${filter}` : url;

    const res = this.http.get<FilteredKeywordModel[]>(url, { observe: 'response' }).toPromise();

    return res;
  }
}
