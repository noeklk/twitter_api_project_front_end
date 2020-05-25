import { TwitterService } from "./../../service/twitter.service";
import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CdkStepperNext } from '@angular/cdk/stepper';

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

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const oauthVerifier = params.oauth_verifier;
      const oauthToken = params.oauth_token;
      if (oauthToken && oauthVerifier) {
        this.saveAccessToken(oauthToken, oauthVerifier);
      }
    });

    if (localStorage.getItem('oauthAccessToken') && localStorage.getItem('oauthAccessTokenSecret')) {
      this.twitterService.GetUserTweets().then((res) => {
        console.log(res);
      });
    }
  }

  saveAccessToken(oauthToken: string, oauthVerifier: string) {

    this.sessionService.saveAccessToken(oauthToken, oauthVerifier).subscribe((res) => {
      localStorage.setItem('oauthAccessToken', res.oauthAccessToken);
      localStorage.setItem('oauthAccessTokenSecret', res.oauthAccessTokenSecret);

      alert('Token saved');
    });
  }

  redirectToTwitter() {
    this.sessionService.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    });
  }
}
