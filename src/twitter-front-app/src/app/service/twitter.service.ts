import { SessionService } from 'src/app/service/session.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class TwitterService {
    private _getUserTweetsUrl = `${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_tweets}`;

    constructor(private http: HttpClient, private sessionService: SessionService) { }

    GetUserTweets(): Promise<HttpResponse<JSON>> {
        const res = this.http.get<JSON>(this._getUserTweetsUrl,
            { headers: this.sessionService.GenerateAllTokensHeader(), observe: 'response' }).toPromise();
        return res;
    }

}
