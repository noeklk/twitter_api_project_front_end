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
      get_user_tweets: 'twitter/get_user_tweets'
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
