import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';

import { Routes, RouterModule } from '@angular/router';
import { AppLocalizationModule } from '@component/shared/app.localization.module';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [{
  path: '',
  component: ForgotPasswordComponent
}
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FlexLayoutModule, 
    AppLocalizationModule,
     [RouterModule.forChild(routes)]
  ]
})
export class ForgotPasswordModule { }
