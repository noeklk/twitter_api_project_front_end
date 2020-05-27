import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'hashtag' })
export class HashtagPipe implements PipeTransform {
    constructor(public sanitizer: DomSanitizer) {
    }
    transform(text: string): SafeHtml {
        if (text) {
            return this.sanitizer.bypassSecurityTrustHtml(
                //le regex match les mots qui commence avec un '#'
                text.replace(/#[^\s]+\s?/, (match) => `<span style="color: blue;">${match}</span>`)
            );

        } else {
            return text;
        }
    }
}