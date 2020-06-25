import { TwitterService } from 'src/app/service/twitter.service';
import { Component, OnInit } from "@angular/core";
import { KeywordService } from 'src/app/service/keyword.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteredKeywordModel } from 'src/app/model/filtered-keyword';
import { KeywordsHelper } from 'src/app/helper/keywords-helper';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  keywords = new Array();
  labels = new Array();
  series = new Array();
  franceTrend: string[];
  filters = ['default', 'hourly', 'daily', 'monthly'];
  currentKeyword: string;
  currentFilter = 'default';
  filterForm: FormGroup;
  disabledFilter = true;

  constructor(
    private keywordService: KeywordService,
    private twitterService: TwitterService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filters: ['default']
    });
  }

  async ngOnInit(): Promise<void> {
    this.franceTrend = await this.GetFranceTrend().then(res => {
      return res;
    }).catch(e => {
      throw e;
    });
  }

  async GetAllKeywordsByKeyword(keyword) {
    this.disabledFilter = false;
    this.currentKeyword = keyword;
    this.currentFilter = 'default';
    this.filterForm.reset({ filters: 'default' });
    this.keywords = [];
    this.labels = [];
    this.series = [];
    const keywords = await this.keywordService.GetAllKeywordsByKeyword(keyword)
      .then(res => {
        return res.body;
      }).catch(e => {
        throw e;
      });

    this.keywords = keywords;
    this.SetLabelsAndSeriesFromKeywords(keywords);
  }

  async GetAllKeywordsByKeywordWithFilter(filter: string) {
    this.currentFilter = filter;
    this.keywords = [];
    this.labels = [];
    this.series = [];

    const keywords = await this.keywordService.GetAllKeywordsByKeyword(this.currentKeyword, filter)
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

  SetLabelsAndSeriesFromKeywords(keywords: FilteredKeywordModel[]) {
    let i = 0;
    for (const keyword of KeywordsHelper.SortKeywords(keywords)) {

      this.series.push(keyword.first.tweets_number);

      if (this.currentFilter === 'default') {
        const date = new Date(keyword.first.created_at);
        const formatedDate = (i === 0 || i === Math.trunc(keywords.length / 2) || i === keywords.length - 1) ? date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) : null;
        this.labels.push(formatedDate);
      }
      else if (this.currentFilter === 'hourly') {
        const date = new Date(keyword.first.created_at);
        const formatedDate = date.getHours() + 'h';
        this.labels.push(formatedDate);
      }
      else if (this.currentFilter === 'daily') {
        const date = new Date(keyword.first.created_at);
        const formatedDate = date.toLocaleString('default', { weekday: 'long' });
        this.labels.push(formatedDate);
      }
      else if (this.currentFilter === 'monthly') {
        const date = new Date(keyword.first.created_at);
        const formatedDate = date.toLocaleString('default', { month: 'long' });
        this.labels.push(formatedDate);
      }

      i++;
    }
  }
}
