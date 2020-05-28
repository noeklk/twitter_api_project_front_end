import { Component, OnInit } from '@angular/core';
import { Keyword } from './keyword';
import { KEYWORDS } from './mock-keywords';
import { Router } from '@angular/router';
// import { PokemonsService } from './keyword.service';
  
@Component({
    selector: 'list-keyword',
    templateUrl: './app/keyword/list-keyword.component.html'
})
export class ListKeywordComponent implements OnInit {
  
    keywords: Keyword[] = null;
  
    constructor(private router: Router) { }
  
    ngOnInit(): void {
        this.keywords = KEYWORDS;
    }
  
    selectKeyword(keyword: Keyword): void {
        let link = ['/keyword', keyword.id];
        this.router.navigate(link);
    }
    
}