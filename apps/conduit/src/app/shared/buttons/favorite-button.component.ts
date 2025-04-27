import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Article, ArticlesService, UserService } from '../../core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  imports: [
    CommonModule
  ]
})
export class FavoriteButtonComponent {
  private articlesService = inject(ArticlesService);
  private router = inject(Router);
  private userService = inject(UserService);


  readonly article = input<Article>(undefined);
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Favorite the article if it isn't favorited yet
        const article = this.article();
        if (!article.favorited) {
          this.articlesService.favorite(article.slug)
          .subscribe({
            next: data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            error: err => this.isSubmitting = false
          });

        // Otherwise, unfavorite the article
        } else {
          this.articlesService.unfavorite(article.slug)
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
