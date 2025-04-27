import { Component, Input } from '@angular/core';
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
  @Input() article: Article;
}
