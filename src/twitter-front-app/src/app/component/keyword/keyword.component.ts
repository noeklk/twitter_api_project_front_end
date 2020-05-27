import { TwitterService } from '../../service/twitter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { HttpResponse } from '@angular/common/http';
import { AccessTokenModel } from 'src/app/model/access-tokens';
import { TweetModel } from 'src/app/model/tweet';
import { Keyword } from './keyword';
import { KEYWORDS } from './mock-keywords';


@Component({
  selector: 'app-home',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {

  keywords: Keyword[] = null;
  title : string = "Liste des keywords utilisés";
  
  ngOnInit(){
    this.keywords = KEYWORDS;
  }

}
