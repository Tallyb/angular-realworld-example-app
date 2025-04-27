import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Comment, User, UserService } from '../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private cd = inject(ChangeDetectorRef);


  private subscription: Subscription;

  @Input() comment: Comment;
  @Input() currentUser: User;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
