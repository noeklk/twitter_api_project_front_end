import { Component, OnInit } from '@angular/core';
import { TwitterService } from 'src/app/service/twitter.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-twitter-trends',
  templateUrl: './twitter-trends.component.html',
  styleUrls: ['./twitter-trends.component.scss']
})
export class TwitterTrendsComponent implements OnInit {

  public loading = false;

  public options = [];

  public myControl = new FormControl();
  public filteredOptions: Observable<any[]>;
  public trendKeywords: any[] = [];

  constructor(
    private twitterService: TwitterService
  ) { }

  ngOnInit(): void {
    this.twitterService.GetWoeids().then(response => {
      // retirer tous les éléments qui ne sont pas des pays
      // note : placeType { code: 12, name: "Country" } and code 19 is worldwide
      // filtrer les propriétés et ne garder que le nom du pays et son woeid
      this.options = (response.body.data as any[])
        .filter(element => element.placeType.code === 19 || element.placeType.code === 12)
        .map(element => ({ country: element.name, woeid: element.woeid }));

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.country),
          map(search => search ? this._filter(search) : this.options.slice())
        );
    });
  }

  onOptionSelected(state: MatAutocompleteSelectedEvent): void {
    this.loading = true;
    this.twitterService.GetTrendsByWoeid(state.option.value.woeid).then(response => {
      this.trendKeywords = response.body.data[0].trends;
    })
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.loading = false);
  }

  displayFn(element: any): string {
    return element && element.country ? element.country : '';
  }

  private _filter(search: string): any[] {
    const filterValue = search.toLowerCase();

    return this.options.filter(element => element.country.toLowerCase().indexOf(search) === 0);
  }
}
