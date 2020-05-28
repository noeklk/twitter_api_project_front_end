import { TweetSetModel } from './../model/tweet';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class TwitterService {
    constructor(private http: HttpClient) { }

    GetUserTweets(): Promise<HttpResponse<TweetSetModel>> {
        const res = this.http.get<TweetSetModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_tweets}`,
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

}
