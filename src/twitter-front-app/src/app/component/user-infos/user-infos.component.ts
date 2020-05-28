import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {
  constructor(
    public twitterService: TwitterService
  ) { }

  ngOnInit(): void {
  }
}
