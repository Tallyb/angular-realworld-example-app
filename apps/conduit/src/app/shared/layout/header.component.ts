import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';


import { User, UserService } from '../../core';
import { ShowAuthedDirective } from '../show-authed.directive';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, ShowAuthedDirective]
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);
  private cd = inject(ChangeDetectorRef);


  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }
}
