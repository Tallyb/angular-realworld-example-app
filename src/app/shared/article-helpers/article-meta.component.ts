import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../core';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ArticleMetaComponent {
  readonly article = input<Article>(undefined);
}
