import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit, AfterViewInit {

  user;

  constructor(
    private twitterService: TwitterService
  ) { }

  ngAfterViewInit(): void {
    //@ts-ignore
    twttr.widgets.load();
  }

  async ngOnInit(): Promise<void> {
    await this.GetUserInfos();
  }

  async GetUserInfos() {
    await this.twitterService.GetUserInfos().then((res) => {
      this.user = res.body;
      this.twitterService.userInfos = res.body;
    }).catch(e => {
      throw e;
    });
  }

}
