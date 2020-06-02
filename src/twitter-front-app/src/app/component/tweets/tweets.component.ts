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

  async ngOnInit(): Promise<void> {
    this.loading = true;
    await this.GetUserTweets();
    await this.GetUserInfos();
    this.loading = false;
  }

  async GetUserTweets() {
    await this.twitterService.GetUserTweets().then((res) => {
      this.tweets = res.body;
    }).catch(e => {
      throw e;
    });
  }

  async GetUserInfos() {
    await this.twitterService.GetUserInfos().then((res) => {
      this.twitterService.userInfos = res.body;
    }).catch(e => {
      throw e;
    });
  }

}
