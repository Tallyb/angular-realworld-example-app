import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';


describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let userService: UserService;
  let router: Router;

  it('should be true', () => {
    expect(true).toBeTruthy();
  });
});
