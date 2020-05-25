import { TwitterService } from './../../service/twitter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CdkStepperNext } from '@angular/cdk/stepper';
import { HttpResponse } from '@angular/common/http';
import { AccessTokenModel } from 'src/app/model/access-tokens';
import { TweetModel } from 'src/app/model/tweet-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private twitterService: TwitterService
  ) {

  }

  tweets: TweetModel;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const oauthVerifier = params.oauth_verifier;
      const oauthToken = params.oauth_token;
      if (oauthToken && oauthVerifier) {
        this.saveAccessToken(oauthToken, oauthVerifier);

      }
    });
  }

  async GetUserTweets() {
    if (!await this.sessionService.CheckAccessTokens()) {
      alert('Vous n\'êtes pas connecté');
      return;
    }

    await this.twitterService.GetUserTweets().then((res: HttpResponse<any>) => {
      this.tweets = res.body.data;

    }).catch(e => {
      throw e;
    });
  }

  saveAccessToken(oauthToken: string, oauthVerifier: string) {

    this.sessionService.saveAccessToken(oauthToken, oauthVerifier).then((res: HttpResponse<AccessTokenModel>) => {
      localStorage.setItem('oauthAccessToken', res.body.oauthAccessToken);
      localStorage.setItem('oauthAccessTokenSecret', res.body.oauthAccessTokenSecret);

      alert('Token saved');
    });
  }

  redirectToTwitter() {
    this.sessionService.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    });
  }
}
