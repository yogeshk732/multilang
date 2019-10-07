import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  load: boolean;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });


  constructor() { 
  }


  login(){
    
  }
  ngOnInit() {
  }

}
