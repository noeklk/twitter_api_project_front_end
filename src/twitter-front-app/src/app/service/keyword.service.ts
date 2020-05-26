import { Injectable } from '@angular/core';
import { KeywordModel, MOCKKEYWORDS } from '../model/keyword';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  constructor() { }

  getKeywordsByKeywordAndUserId(keyword?: string, userId?: string): Promise<KeywordModel[]> {
    // Temporary returns mock data
    return Promise.all(MOCKKEYWORDS);
  }

}
