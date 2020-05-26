import { Injectable } from '@angular/core';
import { KeywordModel, MOCKKEYWORDS } from '../model/keyword';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  constructor() { }

  getKeywordsByKeywordAndUserId(keyword?: string, user_id?: string): KeywordModel[] {
    // Temporary returns mock data
    return MOCKKEYWORDS;
  }

}
