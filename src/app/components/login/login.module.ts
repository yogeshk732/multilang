import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { Routes, RouterModule } from '@angular/router';


import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppLocalizationModule} from '@component/shared/app.localization.module';
const routes: Routes = [{
  path: '',
  component: LoginComponent
}
];

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FlexLayoutModule,    
    MatIconModule,
    [RouterModule.forChild(routes)],
    AppLocalizationModule
  ],
 
  declarations: [LoginComponent]
})
export class LoginModule { }
