import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routesUrl } from '@route/routing-urls';

@NgModule({
  imports: [RouterModule.forRoot(routesUrl)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() { }
}
