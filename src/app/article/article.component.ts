import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  Article,
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService,
  Errors
} from '../core';
import { CommonModule } from '@angular/common';
import { ArticleCommentComponent } from './article-comment.component';
import { ArticleMetaComponent, FavoriteButtonComponent, FollowButtonComponent, ListErrorsComponent } from '../shared';
import { MarkdownPipe } from './markdown.pipe';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ArticleCommentComponent,
    FavoriteButtonComponent,
    ListErrorsComponent,
    FollowButtonComponent,
    ArticleMetaComponent,
    MarkdownPipe,
  ]
})
export class ArticleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private articlesService = inject(ArticlesService);
  private commentsService = inject(CommentsService);
  private router = inject(Router);
  private userService = inject(UserService);
  private cd = inject(ChangeDetectorRef);

  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors: Errors = {errors: {}};
  isSubmitting = false;
  isDeleting = false;

  ngOnInit() {
    // Retreive the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
        this.cd.markForCheck();
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;

        this.canModify = (this.currentUser.username === this.article.author.username);
        this.cd.markForCheck();
      }
    );
  }

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

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article.slug)
      .subscribe({
        next: success => {
          this.router.navigateByUrl('/');
        }
      });
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
        this.cd.markForCheck();
      });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {errors: {}};

    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.article.slug, commentBody)
      .subscribe({
        next: comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
          this.cd.markForCheck();
        },
        error: errors => {
          this.commentFormErrors = errors;
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      });
  }

  onDeleteComment(comment) {
    this.commentsService.destroy(comment.id, this.article.slug)
      .subscribe({
        next: success => {
          this.comments = this.comments.filter((item) => item !== comment);
          this.cd.markForCheck();
        }
      });
  }

}
