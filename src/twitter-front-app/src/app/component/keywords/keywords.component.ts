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
  inputKeyword = 'covid19';

  constructor(
    private keywordService: KeywordService
  ) { }

  ngOnInit(): void {
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

  SetLabelsAndSeriesFromKeywords(keywords: KeywordModel[]) {
    for (const keyword of keywords) {
      this.labels.push(new Date(keyword.created_at).toTimeString().split(' ')[0]);
      this.series.push(keyword.tweets_number);
    }
  }

}
