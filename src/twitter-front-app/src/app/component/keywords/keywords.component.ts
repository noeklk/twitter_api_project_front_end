import { TwitterService } from 'src/app/service/twitter.service';
import { Component, OnInit } from '@angular/core';
import { KeywordModel } from 'src/app/model/keyword';
import { KeywordService } from 'src/app/service/keyword.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  keywords: KeywordModel[];
  labels = [];
  series = [];
  specificKeywords = new Array<KeywordModel>();
  franceTrend: string[];
  inputKeyword = 'covid19';

  constructor(
    private keywordService: KeywordService,
    private twitterService: TwitterService
  ) { }

  async ngOnInit(): Promise<void> {

    this.franceTrend = await this.GetFranceTrend().then(res => {
      return res;
    }).catch(e => {
      throw e;
    });
  }

  async GetAllKeywordsByKeyword(keyword) {
    const keywords = await this.keywordService.GetAllKeywordsByKeyword(keyword)
      .then(res => {
        return res.body;
      }).catch(e => {
        throw e;
      });

    this.keywords = keywords;
    this.SetLabelsAndSeriesFromKeywords(keywords);
  }

  async GetFranceTrend() {
    const trend = await this.twitterService.GetFranceTrend()
      .then(res => {
        return res.body[0].trends;
      }).then(res => {
        const trendName = new Array<string>();
        res.forEach(element => {
          trendName.push(element.name);
        });
        return trendName;
      })
      .catch(e => {
        throw e;
      });

    return trend;
  }

  SetLabelsAndSeriesFromKeywords(keywords: KeywordModel[]) {
    for (const keyword of keywords) {
      this.labels.push(new Date(keyword.created_at).toTimeString().split(' ')[0]);
      this.series.push(keyword.tweets_number);
    }
  }

}
