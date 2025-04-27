import { describe, test, expect, vi, beforeEach } from 'vitest';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: UserService;
  let router: Router;

  test('should be true', () => {
    expect(true).toBeTruthy();
  });
});
