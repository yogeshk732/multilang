import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '@env/environment';
//import { LocalizationService } from "@services/auth/localization.service";
import { AuthService } from "@services/auth/auth.service";
// export function HttpLoaderFactory(http: HttpClient) {
//     return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }


@NgModule({

    imports: [
        TranslateModule.forChild({})
        
    ],
   // providers: [LocalizationService],
    exports: [
        TranslateModule
    ]
})
export class AppLocalizationModule {

    constructor(public translate: TranslateService) {

        console.log(333333333333333, translate)
        translate.addLangs(["en", "ar"]);
        translate.setDefaultLang("en");
        translate.use("en");
        console.log(333333333333333, translate)
    }

    // constructor(private translate: TranslateService, private auth: AuthService) {

    //     console.log(1111111111);
    //     translate.addLangs(environment.localization.languagesCode);
    //   /*   locale.setDefaultLang(environment.localization.default); */
    //     translate.setDefaultLang(environment.localization.default);
    //     let browserLang = translate.getBrowserLang(); 
    //     console.log(22222, browserLang);

    //     let setLAng = this.auth.getCookie('lang');
    //     console.log('setLAng', setLAng);

    //     if (setLAng){
    //         setLAng = setLAng.trim();
    //         translate.use(setLAng);
    //     } else {
    //         translate.use((environment.localization.languagesCode.indexOf(browserLang) > -1) ? browserLang : environment.localization.default);
    //     }         
        
    // }
}
