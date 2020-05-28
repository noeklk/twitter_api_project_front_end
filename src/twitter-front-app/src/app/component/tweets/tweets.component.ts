import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets;

  constructor(
    private twitterService: TwitterService
  ) { }

  ngOnInit(): void {
    this.GetUserTweets();
  }


  GetUserTweets() {
    this.twitterService.GetUserTweets().then((res: HttpResponse<any>) => {
      this.tweets = res.body.data;
    }).catch(e => {
      throw e;
    });
  }

}
