import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ExampleService } from './service';
import { routes } from '@conduit/app/auth/auth-routing.routes';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return greeting', () => {
    expect(service.getGreeting()).toBe('Hello from ExampleService!');
  });

  it('should return routes', () => {
    expect(routes).toBeDefined();
  });
});