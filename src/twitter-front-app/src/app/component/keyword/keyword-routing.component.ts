import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
  
import { ListKeywordComponent }    from './list-keyword.component';
import { DetailKeywordComponent }  from './detail-keyword.component';
  
// les routes du module Pokémon
const keywordsRoutes: Routes = [
    { path: 'keyword', component: ListKeywordComponent },
    { path: 'keyword/:id', component: DetailKeywordComponent }
];
  
@NgModule({
    imports: [
        RouterModule.forChild(keywordsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class KeywordRoutingModule { }