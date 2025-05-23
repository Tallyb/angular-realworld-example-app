import { Component, OnInit, ChangeDetectionStrategy, inject } from "@angular/core";

import { ApiService, HttpTokenInterceptor, UserService } from "./core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent, FooterComponent } from "./shared/layout";

import { ListErrorsComponent } from "./shared/list-errors.component";
import { ShowAuthedDirective } from "./shared/show-authed.directive";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

@Component({
  selector: "app-root",
  template: `
    <app-layout-header />

    <router-outlet />

    <app-layout-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
],
})
export class AppComponent implements OnInit {

  private userService = inject(UserService);

  ngOnInit() {
    this.userService.populate();
  }
}
