import { TweetSetModel } from './../model/tweet';
import { UserInfosSetModel } from './../model/user-Infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class TwitterService {
    constructor(private http: HttpClient) { }

    public userInfos;

    GetUserTweets(): Promise<HttpResponse<TweetSetModel>> {
        const res = this.http.get<TweetSetModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_tweets}`,
            { observe: 'response' }).toPromise();
        return res;
    }

    GetUserInfos(): Promise<HttpResponse<UserInfosSetModel>> {
        const res = this.http.get<UserInfosSetModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_infos}`,
            { observe: 'response' }).toPromise();
        return res;
    }

    GetWoeids(): Promise<HttpResponse<any>> {
        const res = this.http.get<any>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_woeids}`,
            { observe: 'response' }).toPromise();
        return res;
    }

    GetTrendsByWoeid(woeid: number): Promise<HttpResponse<any>> {
        const res = this.http.get<any>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_trend_by_woeid}${woeid}`,
            { observe: 'response' }).toPromise();
        return res;
    }

    invalidateToken(): Observable<any> {
        return this.http.post(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.invalidate_token}`, null);
    }

    updateStatus(status: string): Observable<any> {
        return this.http.post(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.status_update}`, { status });
    }

}
