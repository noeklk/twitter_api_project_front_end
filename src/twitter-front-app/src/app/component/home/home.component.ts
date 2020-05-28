import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) { }

  tweets = new Array<TweetModel>();
  retweets = new Array<TweetModel>();

  isAuthenticated = false;

  tweeterConnectStatus = 'Se connecter à Twitter';

  ngOnInit(): void {
    // Vérifie si le token d'accès pour l'utilisateur a bien été généré pour l'utilisateur connecté

    if (this.sessionService.CheckAccessTokens()) {
      this.isAuthenticated = true;
      this.tweeterConnectStatus = 'Changer de compte';
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        const oauthVerifier = params.oauth_verifier ? params.oauth_verifier : null;
        const oauthToken = params.oauth_token ? params.oauth_token : null;
        if (oauthToken && oauthVerifier) {
          this.SaveAccessToken(oauthToken, oauthVerifier);
          this.tweeterConnectStatus = 'Changer de compte';
        }
      });
    }
  }

  SaveAccessToken(oauthToken: string, oauthVerifier: string) {

    this.sessionService.SaveAccessToken(oauthToken, oauthVerifier).then((res: HttpResponse<AccessTokenModel>) => {
      localStorage.setItem('oauthAccessToken', res.body.oauthAccessToken);
      localStorage.setItem('oauthAccessTokenSecret', res.body.oauthAccessTokenSecret);

      alert('Connexion avec le compte twitter établie');
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
    }).catch(e => {
      const errorMessage = e.error.message ? e.error.message : 'Erreur de connexion avec l\'Api';
      console.log(errorMessage);
    });
  }

  RedirectToTwitter() {
    this.sessionService.GetRedirectUrl().then((res: any) => {
      location.href = res.redirectUrl;
    });
  }
}
