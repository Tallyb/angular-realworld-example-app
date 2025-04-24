import { NgModule } from '@angular/core';

import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './article-comment.component';
import { MarkdownPipe } from './markdown.pipe';

import { ArticleRoutingModule } from './article-routing.module';

@NgModule({
    imports: [
    ArticleRoutingModule,
    ArticleComponent,
    ArticleCommentComponent,
    MarkdownPipe
],
    providers: []
})
export class ArticleModule {}
