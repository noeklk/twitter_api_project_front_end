import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets: any;
  loading = true;

  constructor(
    private twitterService: TwitterService
  ) { }

  ngOnInit(): void {
    this.GetUserTweets();
  }

  GetUserTweets() {
    this.twitterService.GetUserTweets().then((res) => {
      this.loading = true;
      this.tweets = res.body.data;
    }).catch(e => {
      throw e;
    }).finally(() => {
      this.loading = false;
    });
  }

}
