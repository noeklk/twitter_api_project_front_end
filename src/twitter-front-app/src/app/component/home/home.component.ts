import { TwitterService } from './../../service/twitter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
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
  ) { }

  tweets = new Array<TweetModel>();
  retweets = new Array<TweetModel>();

  showfeed = false;

  tweeterConnectStatus = 'Se connecter à Twitter';

  async ngOnInit(): Promise<void> {
    // Vérifie si le token d'accès pour l'utilisateur a bien été généré pour l'utilisateur connecté

    await this.sessionService.CheckAccessTokens().then((res) => {
      if (res) {
        this.tweeterConnectStatus = 'Changer de compte';
      } else {
        this.activatedRoute.queryParams.subscribe(params => {
          const oauthVerifier = params.oauth_verifier;
          const oauthToken = params.oauth_token;
          if (oauthToken && oauthVerifier) {
            this.saveAccessToken(oauthToken, oauthVerifier);
            this.tweeterConnectStatus = 'Changer de compte';
          }
        });
      }
    });
  }

  async saveAccessToken(oauthToken: string, oauthVerifier: string) {

    await this.sessionService.saveAccessToken(oauthToken, oauthVerifier).then((res: HttpResponse<AccessTokenModel>) => {
      localStorage.setItem('oauthAccessToken', res.body.oauthAccessToken);
      localStorage.setItem('oauthAccessTokenSecret', res.body.oauthAccessTokenSecret);

      alert('Token saved');
    }).catch(e => {
      const errorMessage = e.error.message ? e.error.message : 'Erreur de connexion avec l\'Api';
      console.log(errorMessage);
    });
  }

  redirectToTwitter() {
    this.sessionService.getRedirectUrl().then((res: any) => {
      location.href = res.redirectUrl;
    });
  }

  async GetUserTweets() {
    if (!await this.sessionService.CheckAccessTokens()) {
      alert('Vous n\'êtes connecté à aucun compte Twitter');
      return;
    }

    await this.twitterService.GetUserTweets().then((res: HttpResponse<any>) => {
      const tweets = res.body.data;
      this.FilterTweets(tweets);
      this.showfeed = true;
    }).catch(e => {
      throw e;
    });
  }

  FilterTweets(tweets: TweetModel[]) {
    this.retweets = [];
    this.tweets = [];
    for (const elem of tweets) {
      if (elem.retweeted === true) {
        this.retweets.push(elem);
      } else {
        this.tweets.push(elem);
      }
    }
  }

  HideFeed() {
    this.showfeed = false;
  }
}
