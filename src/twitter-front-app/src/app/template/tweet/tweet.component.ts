import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Input() tweet;
  media = [];

  constructor() { }

  ngOnInit(): void {
    this.sanitizeText();
  }

  sanitizeText() {
    // removing media url
    if (this.tweet.entities.media) {
      this.tweet.text = this.tweet.text.replace(this.tweet.entities.media[0].url, '');
    }

    // removing entities url
    if (this.tweet.entities.urls.length > 0) {
      this.tweet.text = this.tweet.text.replace(this.tweet.entities.urls[0].url, ' ');
    }

    // sanitization for quoted_status (retweets with comment)
    if (this.tweet.quoted_status) {

      // retweet quoted status media url
      if (this.tweet.quoted_status.entities.media) {
        if (this.tweet.quoted_status.text.includes(this.tweet.quoted_status.entities.media[0].url)) {
          this.tweet.quoted_status.text = this.tweet.quoted_status.text.replace(this.tweet.quoted_status.entities.media[0].url, ' ');
        }
      }

      // retweet quoted status entities url
      if (this.tweet.quoted_status.entities.urls.length > 0) {
        this.tweet.quoted_status.text = this.tweet.quoted_status.text.replace(this.tweet.quoted_status.entities.urls[0].url, ' ');
      }
    }

    // sanitization for retweeted_status (retweets with no comment)
    if (this.tweet.retweeted_status) {

      // retweet quoted status media url
      if (this.tweet.retweeted_status.entities.media) {
        if (this.tweet.retweeted_status.text.includes(this.tweet.retweeted_status.entities.media[0].url)) {
          this.tweet.retweeted_status.text = this.tweet.retweeted_status.text
            .replace(this.tweet.retweeted_status.entities.media[0].url, ' ');
        }
      }

      // retweet quoted status entities url
      if (this.tweet.retweeted_status.entities.urls.length > 0) {
        this.tweet.retweeted_status.text = this.tweet.retweeted_status.text
          .replace(this.tweet.retweeted_status.entities.urls[0].url, ' ');
      }
    }

  }

}