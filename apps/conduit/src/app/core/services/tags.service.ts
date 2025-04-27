import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiService = inject(ApiService);


  getAll(): Observable<[string]> {
    return this.apiService.get('/tags')
          .pipe(map(data => data.tags));
  }

}
