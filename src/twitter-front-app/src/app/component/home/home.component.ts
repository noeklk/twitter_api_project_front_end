import { AuthService } from "src/app/service/auth.service";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private authService: AuthService
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
  }

  saveAccessToken(oauthToken: string, oauthVerifier: string) {
    this.sessionService.saveAccessToken(oauthToken, oauthVerifier).subscribe(res => {
      alert('Token saved');
    });
  }

  redirectToTwitter() {
    this.sessionService.getRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    });
  }
}
