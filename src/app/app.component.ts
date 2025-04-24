import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { UserService } from "./core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent, FooterComponent } from "./shared/layout";

import { ListErrorsComponent } from "./shared/list-errors.component";
import { ShowAuthedDirective } from "./shared/show-authed.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "app-root",
  template: `
    <app-layout-header></app-layout-header>

    <router-outlet></router-outlet>

    <app-layout-footer></app-layout-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    CommonModule,
    FormsModule,
  ],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
  }
}
