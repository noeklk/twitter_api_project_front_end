// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  nodejs_api_host: `http://${window.location.hostname}:3000/`,

  nodejs_api_route: {
    user: {
      register: 'users/register/',
      login: 'users/login/',

      get_a_user_by_id: 'users/',
      get_all_users: 'users/',

      delete_a_user_by_id: 'users/'
    },
    token_check: 'token/',
    session: {
      connect: 'sessions/connect',
      save_access_tokens: 'sessions/save_access_tokens'
    },
    twitter: {
      get_user_tweets: 'twitter/get_user_tweets',
      get_user_infos: 'twitter/get_user_infos',
      get_trend_by_woeid: 'twitter/trends/',
      get_woeids: 'twitter/woeids',
      invalidate_token: 'twitter/invalidate_token',
      status_update: 'twitter/update_status',
      get_oembeded: 'twitter/get_oembeded'
    },
    keyword: {
      get_all_keywords_by_id_user: 'users',
      get_keywords_by_id_user_and_keyword: 'users'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
