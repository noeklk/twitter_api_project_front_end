import { TweetModel } from './../model/tweet-model';
import { SessionService } from 'src/app/service/session.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

}
