export class KeywordModel {
    constructor(
        public keyword: string,
        public tweets_number: number,
        public id_user: string,
        public created_at: Date,
        public _id?: string
    ){}
}

export const MOCKKEYWORDS: KeywordModel[] = [
    new KeywordModel('Covid', 80, 'someid', new Date('2020-05-05T20:00:00')),
    new KeywordModel('Covid', 114, 'someid', new Date('2020-05-05T20:10:00')),
    new KeywordModel('Covid', 120, 'someid', new Date('2020-05-05T20:20:00')),
    new KeywordModel('Covid', 123, 'someid', new Date('2020-05-05T20:30:00')),
    new KeywordModel('Covid', 140, 'someid', new Date('2020-05-05T20:40:00')),
    new KeywordModel('Covid', 143, 'someid', new Date('2020-05-05T20:50:00')),
    new KeywordModel('Covid', 150, 'someid', new Date('2020-05-05T21:00:00')),
    new KeywordModel('Covid', 130, 'someid', new Date('2020-05-05T21:10:00'))
];
