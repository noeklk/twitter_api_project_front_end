import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';
import { UserInfosModel } from 'src/app/model/user-infos';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  info: any;

  constructor(
    private twitterService: TwitterService
  ) { }

  ngOnInit(): void {
    this.GetUserInfos();
  }
  GetUserInfos() {
    this.twitterService.GetUserInfos().then((res) => {
      this.info = res.body.data;
    }).catch(e => {
      throw e;
    });
  }
  

}
