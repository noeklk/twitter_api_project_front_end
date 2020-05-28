import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';
import { TweetModel } from 'src/app/model/tweet';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets: any;

  constructor(
    private twitterService: TwitterService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    if (this.sessionService.CheckAccessTokens()) {
      this.GetUserTweets();
    }
  }

  GetUserTweets() {
    this.twitterService.GetUserTweets().then((res) => {
      this.tweets = res.body.data;
    }).catch(e => {
      throw e;
    });
  }

}
