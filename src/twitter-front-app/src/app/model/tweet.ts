
export interface TweetModel {
    created_at: Date;
    text: string;
    retweeted: boolean;
}

export interface TweetSetModel {
    data: {
        [tweets: number]: { tweet: TweetModel }
    };
}
