import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleListConfig, Profile } from '../core';
import { ArticleListComponent } from '../shared';


@Component({
  selector: "app-profile-favorites",
  template: `
    <app-article-list [limit]="10" [config]="favoritesConfig">
    </app-article-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleListComponent],
})
export class ProfileFavoritesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);


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
