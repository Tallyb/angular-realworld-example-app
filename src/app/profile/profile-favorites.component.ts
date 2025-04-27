import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleListConfig, Profile } from '../core';
import { ArticleListComponent } from '../shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-profile-favorites",
  template: `
    <app-article-list [limit]="10" [config]="favoritesConfig">
    </app-article-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ArticleListComponent],
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  profile: Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.favoritesConfig = {...this.favoritesConfig};
        this.favoritesConfig.filters.favorited = this.profile.username;
        this.cd.markForCheck();
      }
    );
  }

}
