
export interface UserInfosModel {
    created_at: Date;
    text: string;
    retweeted: boolean;
}

export interface UserInfosSetModel {
    data: {
        [tweets: number]: { tweet: UserInfosModel }
    };
}
