import { AuthService } from 'src/app/service/auth.service';
import { KeywordService } from './../../service/keyword.service';
import { KeywordModel } from './../../model/keyword';
import { TwitterService } from './../../service/twitter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { HttpResponse } from '@angular/common/http';
import { AccessTokenModel } from 'src/app/model/access-tokens';
import { TweetModel } from 'src/app/model/tweet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private twitterService: TwitterService,
    private keywordService: KeywordService,
    private authService: AuthService
  ) { }

  tweets = new Array<TweetModel>();
  retweets = new Array<TweetModel>();

  showfeed = false;
  connected = false;

  keywords: KeywordModel[];

  labels = [];
  series = [];
  specificKeywords = new Array<KeywordModel>();
  inputKeyword = '';

  tweeterConnectStatus = 'Se connecter à Twitter';

  async ngOnInit(): Promise<void> {
    // Vérifie si le token d'accès pour l'utilisateur a bien été généré pour l'utilisateur connecté

    await this.sessionService.CheckAccessTokens().then((res) => {
      if (res) {
        this.tweeterConnectStatus = 'Changer de compte';
        this.connected = true;
        this.GetUserTweets();
      } else {
        this.activatedRoute.queryParams.subscribe(params => {
          const oauthVerifier = params.oauth_verifier;
          const oauthToken = params.oauth_token;
          if (oauthToken && oauthVerifier) {
            this.SaveAccessToken(oauthToken, oauthVerifier);
            this.tweeterConnectStatus = 'Changer de compte';
            this.connected = true;
          }
        });
      }
    });
  }

  async SaveAccessToken(oauthToken: string, oauthVerifier: string) {
    await this.sessionService.SaveAccessToken(oauthToken, oauthVerifier).then((res: HttpResponse<AccessTokenModel>) => {
      localStorage.setItem('oauthAccessToken', res.body.oauthAccessToken);
      localStorage.setItem('oauthAccessTokenSecret', res.body.oauthAccessTokenSecret);
      alert('Token saved');
      this.GetUserTweets();
    }).catch(e => {
      const errorMessage = e.error.message ? e.error.message : 'Erreur de connexion avec l\'Api';
      console.log(errorMessage);
    });
  }

  RedirectToTwitter() {
    this.sessionService.GetRedirectUrl().then((res: any) => {
      location.href = res.body.redirectUrl;
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
    this.tweets = [];
    for (const elem of tweets) {
      this.tweets.push(elem);
    }
  }

  HideFeed() {
    this.showfeed = false;
  }

  async GetAllKeywordsByIdUser() {
    await this.keywordService.GetAllKeywordsByUserId()
      .then(res => {
        this.keywords = res.body;
      }).catch(e => {
        throw e;
      });
  }

  GetKeywordsByIdUserAndKeyword(keyword) {
    this.keywordService.GetKeywordByIdUserAndKeyword(keyword)
      .then(res => {
        this.specificKeywords = res.body;
        console.log(res.body);
        this.setLabelsAndSeriesFromKeywords(res.body);
      }).catch(e => {
        throw e;
      });
  }

  setLabelsAndSeriesFromKeywords(keywords: KeywordModel[]) {
    for (const keyword of keywords) {
      this.labels.push(keyword.created_at);
      this.series.push(keyword.tweets_number);
    }
  }
}
