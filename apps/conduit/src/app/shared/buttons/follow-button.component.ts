import { Component, EventEmitter, Output, inject, input } from '@angular/core';
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
  private userService = inject(UserService);
  private profilesService = inject(ProfilesService);
  private router = inject(Router);


  readonly profile = input<Profile>(undefined);
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
        const profile = this.profile();
        if (!profile.following) {
          this.profilesService.follow(profile.username)
          .subscribe({
            next: data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            error: err => this.isSubmitting = false
          });

        // Otherwise, unfollow this profile
        } else {
          this.profilesService.unfollow(profile.username)
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
