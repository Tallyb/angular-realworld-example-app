import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ArticleListConfig, Profile } from "../core";
import { ArticleListComponent } from "../shared";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-profile-articles",
  template: `
    <app-article-list [limit]="10" [config]="articlesConfig">
    </app-article-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ArticleListComponent],
})
export class ProfileArticlesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

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
