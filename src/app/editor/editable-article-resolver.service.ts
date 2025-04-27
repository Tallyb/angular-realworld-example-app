import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Article, ArticlesService, UserService } from '../core';
import { catchError ,  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditableArticleResolver implements Resolve<Article> {
  private articlesService = inject(ArticlesService);
  private router = inject(Router);
  private userService = inject(UserService);


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.articlesService.get(route.params['slug'])
      .pipe(
        map(
          article => {
            if (this.userService.getCurrentUser().username === article.author.username) {
              return article;
            } else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}
