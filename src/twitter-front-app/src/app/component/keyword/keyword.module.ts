import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeywordRoutingModule } from './keyword-routing.component';

import { ListKeywordComponent } from './list-keyword.component';
import { DetailKeywordComponent } from './detail-keyword.component';

@NgModule({
    imports: [
        CommonModule,
        KeywordRoutingModule
    ],
    declarations: [
        ListKeywordComponent,
        DetailKeywordComponent
    ],
    providers: []
})
export class KeywordModule { }