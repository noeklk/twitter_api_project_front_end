import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input() tweet;
  media = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.tweet.entities.media) {
      console.log("c'est goood mon bro");
      
      console.log(this.tweet.entities.media[0].media_url_https);
    }
    
  }

}
