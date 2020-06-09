import { UserInfosModel } from './../../model/user-infos';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  constructor(
    public twitterService: TwitterService
  ) { }

  async ngOnInit(): Promise<void> {
    this.twitterService.userInfos = await this.GetUserInfos();

    setTimeout(res => {
      // @ts-ignore
      twttr.widgets.load(
        document.getElementById('components-container')
      );
    }, 0);
  }

  async GetUserInfos(): Promise<UserInfosModel> {
    let response;
    await this.twitterService.GetUserInfos().then((res) => {
      response = res.body;
    }).catch(e => {
      throw e;
    });

    return response;
  }

}
