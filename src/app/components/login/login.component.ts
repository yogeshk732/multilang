import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  TranslateService } from '@ngx-translate/core';

//import { LocalizationService } from "@services/auth/localization.service";
import { environment } from '@env/environment';
import { RequestService } from '@services/http/request.service';
import { LOGIN_API, } from '@env/api.paths';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  load: boolean;
  currentLang:string;
  visible;
  languages = environment.localization.languages;

  message: String;
  authMessage: object;
  loggedIn: boolean;
  loggedInUserData;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', Validators.required),
  });

  

  constructor(
    private router: Router, 
    public translate: TranslateService, 
   // public locale: LocalizationService,
    private request: RequestService,
    
    ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
   
    // locale.activeLanguage.subscribe(lang => {

    //   console.log('lang',lang)
    //   if (!lang){
    //     // this.locale.switchLang('ed');
    //     lang = environment.localization.default;
    //   }

    //   // setTimeout(() => {
    //   //   this.locale.switchLang(lang);
    //   // }, 500);
      
    //   this.currentLang = lang;
     
    // });
  }
  changeLang(lang) {
    this.translate.use(lang);
  }


  login() {

    if (!this.loginForm.valid) {
      return;
    }

    this.loginForm.value['company_id'] = 1;
    this.loginForm.value['fcm_id'] = 3214569873213215649;
    this.loginForm.value['device_id'] = 321456987;
    this.loginForm.value['device_type'] = 'chrome';

    this.load = true;
    this.request.POST(LOGIN_API, this.loginForm.value).subscribe((resp) => {
      console.log('resp', resp);
      if (resp['status']) {
        this.load = false;
        // this.loggedIn = true;
        // this.loggedInUserData = resp.data;
      }
    }, (err) => {

      console.log('err', err);
      this.load = false;
      // if (err && err['error']) {
      //   this.message = err.message;
      // }
 
    });

    this.router.navigate(['/']);
  
  }


  ngOnInit() {
  }

}
