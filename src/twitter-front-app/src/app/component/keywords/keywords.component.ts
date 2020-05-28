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

  GetAllKeywordsByIdUser() {
    this.keywordService.GetAllKeywordsByUserId()
      .then(res => {
        this.keywords = res.body;
      }).catch(e => {
        throw e;
      });
  }

  GetKeywordsByIdUserAndKeyword(keyword) {
    this.keywordService.GetKeywordByIdUserAndKeyword(keyword)
      .then(res => {
        this.specificKeywords = res.body;
        console.log(res.body);
        this.setLabelsAndSeriesFromKeywords(res.body);
      }).catch(e => {
        throw e;
      });
  }

  setLabelsAndSeriesFromKeywords(keywords: KeywordModel[]) {
    for (const keyword of keywords) {
      this.labels.push(new Date(keyword.created_at).toTimeString().split(' ')[0]);
      this.series.push(keyword.tweets_number);
    }
  }

}
