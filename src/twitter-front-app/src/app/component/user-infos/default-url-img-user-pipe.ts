import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'defaultUrlImgUser' })
export class DefaultUrlImgUserPipe implements PipeTransform {
  transform(firstUrl: string): string {

    let lastUrl: string;
    lastUrl = firstUrl.replace('_normal', '');
    return lastUrl;
  }
}
