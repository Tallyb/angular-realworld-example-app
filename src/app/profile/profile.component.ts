import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { User, UserService, Profile } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';
import { FollowButtonComponent } from '../shared';
import { ArticleListComponent } from '../shared';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FollowButtonComponent, RouterModule],
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private cd = inject(ChangeDetectorRef);


  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe((() => {
      this.cd.markForCheck();
    }));
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
