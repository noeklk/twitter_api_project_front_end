import { Pipe, PipeTransform } from '@angular/core';
  

@Pipe({name: 'defaultUrlImgUser'})
export class DefaultUrlImgUserPipe implements PipeTransform {
  transform(first_url: string): string {
  
    let last_url: string;
    last_url = first_url.replace('_normal','');
    return last_url;
  }
}