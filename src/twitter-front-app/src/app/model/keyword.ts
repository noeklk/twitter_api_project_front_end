export class keywordModel {
    constructor( 
        public keyword: string,
        public tweets_number: number,
        public id_user: string,
        public created_at: Date,
        public _id?: string
    ){}
}

export const MOCKKEYWORDS: keywordModel[] = [
    new keywordModel("Covid", 80, "someid", new Date("2020-05-05T20:00:00")),
    new keywordModel("Covid", 114, "someid", new Date("2020-05-05T20:10:00")),
    new keywordModel("Covid", 120, "someid", new Date("2020-05-05T20:20:00")),
    new keywordModel("Covid", 123, "someid", new Date("2020-05-05T20:30:00")),
    new keywordModel("Covid", 140, "someid", new Date("2020-05-05T20:40:00")),
    new keywordModel("Covid", 143, "someid", new Date("2020-05-05T20:50:00")),
    new keywordModel("Covid", 150, "someid", new Date("2020-05-05T21:00:00")),
    new keywordModel("Covid", 130, "someid", new Date("2020-05-05T21:10:00"))
];