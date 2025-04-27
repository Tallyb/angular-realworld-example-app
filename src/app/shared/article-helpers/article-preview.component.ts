import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


import { Article } from '../../core';
import { ArticleMetaComponent } from './article-meta.component';
import { FavoriteButtonComponent } from '../buttons/favorite-button.component';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  imports: [
    RouterModule,
    ArticleMetaComponent,
    FavoriteButtonComponent
]
})
export class ArticlePreviewComponent {
  @Input() article: Article;

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  trackByFn(index, item) {
    return index;
  }
}
