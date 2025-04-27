import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiService = inject(ApiService);


  add(slug, payload): Observable<Comment> {
    return this.apiService
    .post(
      `/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(map(data => data.comment));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }

}
