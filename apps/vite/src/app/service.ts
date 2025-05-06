import { Injectable } from '@angular/core';
import { routes } from '@conduit/app/auth/auth-routing.routes';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor() {}

  getGreeting(): string {
    return 'Hello from ExampleService!';
  }
}
