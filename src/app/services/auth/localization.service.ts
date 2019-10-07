import { Injectable, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AuthService } from "@services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {

    private activeLang = new BehaviorSubject(null); // next push data on pipeline
    activeLanguage = this.activeLang.asObservable(); // suscribe data

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private translate: TranslateService,
        private auth: AuthService
    ) {
        console.log(9999999999999)
    }
    switchLang(lang) {
        this.translate.use(lang);
        this.auth.setCookie('lang', lang);
        this.emitLanguange(lang);
    }

    setDefaultLang(lang){  
        let setLang = this.auth.getCookie('lang');
        console.log('setLang', setLang);
        if (setLang){}else{
            console.log('67676767',lang)
            this.auth.setCookies('lang',lang);
            this.translate.setDefaultLang(lang); 
        }
             
        this.emitLanguange(lang);
    }


    /**
    * Watch language
    */
    emitLanguange(data) {        
        this.changeStyleSheet(data);
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.activeLang.next(event.lang);
        });

    }


    changeStyleSheet(data){
        this.removeDynamicStyle('dynamic-style');
        if (data == 'ar') {                
            this.loadDynamicStyle("./assets/css/bootstrap-rtl.css", `${data}-style`);
            this.loadDynamicStyle("./assets/css/bootstrap-flipped.css", `${data}-style`);
            this.loadDynamicStyle("./assets/css/arabic.css", `${data}-style`);
        }
    }

    loadDynamicStyle(url,className){
        const head = this.document.getElementsByTagName('head')[0];
        const style = this.document.createElement('link');
        style.className = className;
        style.className = 'dynamic-style';
        style.rel = 'stylesheet';
        style.href = `${url}`;
        head.appendChild(style);
    }

    removeDynamicStyle(name) {
        let elements = this.document.getElementsByClassName(name);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        
    }

}

