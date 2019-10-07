// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  app_name: "Eyenak",
  production: false,
  api_path: 'http://eyenak.net/api/web/v1/',
  cookiesOptions: {
    storeUnencoded: true // false
  },
  localization: {
    default: 'en',
    languagesCode: ['en', 'ar'],
    languages: [
      {
        esLabel: "English",
        label: "English",
        code: 'en'
      },
      {
        esLabel:"Arebic",
        label: "العربية",
        code: 'ar'
      }
    ]
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
