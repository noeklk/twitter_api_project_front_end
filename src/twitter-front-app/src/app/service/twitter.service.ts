import { TweetSetModel } from './../model/tweet';
import { UserInfosSetModel } from './../model/user-infos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

    GetUserInfos(): Promise<HttpResponse<UserInfosSetModel>> {
        const res = this.http.get<UserInfosSetModel>(`${environment.nodejs_api_host}${environment.nodejs_api_route.twitter.get_user_infos}`,
            { observe: 'response' }).toPromise();
        return res;
    }


}
