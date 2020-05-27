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
    this.tweet.text = this.sanitizeText(this.tweet.text);

    if (this.tweet.quoted_status) {
      this.tweet.quoted_status.text = this.sanitizeText(this.tweet.quoted_status.text);
    }
  }

  sanitizeText(text: string): string {
    //replacing \n with <br>
    let sanitizedText: string = text.replace("\n", "<br>");
    // removing image url
    if(this.tweet.entities.media && text.includes(this.tweet.entities.media[0].url)) {
      sanitizedText = sanitizedText.replace(this.tweet.entities.media[0].url, "");
    }
    return sanitizedText;
  }

}
