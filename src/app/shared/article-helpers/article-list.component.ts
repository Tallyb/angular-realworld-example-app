import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Article, ArticleListConfig, ArticlesService } from '../../core';
import { ArticlePreviewComponent } from './article-preview.component';

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ArticlePreviewComponent
  ]
})
export class ArticleListComponent implements OnInit {


  @Input() limit: number;
  @Input() config: ArticleListConfig;

  private articlesService: ArticlesService = inject(ArticlesService);
  query: ArticleListConfig = {
    type: 'all',
    filters: {}
  };
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  ngOnInit() {
    // Initialize with default values
    this.query = {...this.config};
    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  trackByFn(index, item) {
    return index;
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
    .subscribe({
      next: data => {
        this.loading = false;
        this.results = data.articles;

        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
      }
    });
  }
}
