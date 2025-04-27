import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Profile, UserService, ProfilesService } from '../../core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FollowButtonComponent {
  constructor(
    private userService: UserService,
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          this.profilesService.follow(this.profile.username)
          .subscribe({
            next: data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            error: err => this.isSubmitting = false
          });

        // Otherwise, unfollow this profile
        } else {
          this.profilesService.unfollow(this.profile.username)
          .subscribe({
            next: data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            error: err => this.isSubmitting = false
          });
        }
      }
    );
  }
}
