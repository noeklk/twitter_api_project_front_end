import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Keyword } from './keyword';
import { KEYWORDS } from './mock-keywords';
  
@Component({
    selector: 'detail-keyword',
    templateUrl: './app/keyword/detail-keyword.component.html'
})
export class DetailKeywordComponent implements OnInit {
  
    keywords: Keyword[] = null;
    keyword: Keyword = null;
  
    constructor(private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
        this.keywords = KEYWORDS;
  
        let id = +this.route.snapshot.paramMap.get('id');
        for (let i = 0; i < this.keywords.length; i++) {
            if (this.keywords[i].id == id) {
                this.keyword = this.keywords[i];
            }
        }
    }
  
    goBack(): void {
        this.router.navigate(['/keyword']);
        //autre methode
        //window.history.back();
    }
  
}