import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ArticleListConfig, Profile } from "../core";
import { ArticleListComponent } from "../shared";


@Component({
  selector: "app-profile-articles",
  template: `
    <app-article-list [limit]="10" [config]="articlesConfig">
    </app-article-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleListComponent],
})
export class ProfileArticlesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);


  profile: Profile;
  articlesConfig: ArticleListConfig = {
    type: "all",
    filters: {},
  };

  ngOnInit() {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.articlesConfig = {
        type: "all",
        filters: {},
      }; // Only method I found to refresh article load on swap
      this.articlesConfig.filters.author = this.profile.username;
      this.cd.markForCheck();
    });
  }
}
