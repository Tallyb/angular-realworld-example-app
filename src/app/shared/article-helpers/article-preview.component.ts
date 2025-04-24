import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Article } from '../../core';
import { ArticleMetaComponent } from './article-meta.component';
import { FavoriteButtonComponent } from '../buttons/favorite-button.component';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleMetaComponent, FavoriteButtonComponent]
})
export class ArticlePreviewComponent {
  @Input() article: Article;

  trackByFn(index, item) {
    return index;
  }

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
