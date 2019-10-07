import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@appComponent/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@route/app-routing.module';
import { LayoutComponent } from '@layout/layout.component';
import { SidebarComponent } from './common-components/sidebar/sidebar.component';
import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { RightSidebarComponent } from './common-components/right-sidebar/right-sidebar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from '@services/interceptors/interceptors.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
// import { AppLocalizationModule } from '@component/shared/app.localization.module';


import { HttpClient } from '@angular/common/http';

import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateModule, TranslateLoader, TranslateModuleConfig, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader,  } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return '';
  }
}

export function tokenGetter() {
  return 'TOKNE';
}

const TRANSLATE_MODULE_CONFIG: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (HttpLoaderFactory),
    deps: [HttpClient]
  },
  missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RightSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    CookieModule.forRoot(),
   // AppLocalizationModule,
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200/'],
        blacklistedRoutes: ['']
      }
    }),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
  }

 }
