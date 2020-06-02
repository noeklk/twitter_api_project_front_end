
export interface UserInfosModel {
    created_at: Date;
    text: string;
    retweeted: boolean;
    friends_count: number;
    followers_count: number;
    location: string;
    description: string;
    screen_name: string;
    name: string;
    profile_image_url_https: string;
}
