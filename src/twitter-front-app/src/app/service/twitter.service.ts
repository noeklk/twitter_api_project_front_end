import { SessionService } from 'src/app/service/session.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class TwitterService {
    constructor(private http: HttpClient, private sessionService: SessionService) { }

    GetUserTweets(): Promise<HttpResponse<JSON>> {
        const res = this.http.get<JSON>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_tweets}`,
            { headers: this.sessionService.GenerateAccessTokenHeader(), observe: 'response' }).toPromise();
        return res;
    }

    GetWoeids(): Promise<HttpResponse<any>> {
        const res = this.http.get<any>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_woeids}`,
        { headers: this.sessionService.GenerateAccessTokenHeader(), observe: 'response' }).toPromise();
        return res;
    }

    GetTrendsByWoeid(woeid: number): Promise<HttpResponse<any>> {
        const res = this.http.get<any>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_trend_by_woeid}${woeid}`,
        { headers: this.sessionService.GenerateAccessTokenHeader(), observe: 'response' }).toPromise();
        return res;
    }
}
