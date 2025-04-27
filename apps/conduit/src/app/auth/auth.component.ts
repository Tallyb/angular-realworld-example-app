import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { Errors, UserService } from '../core';
import { ListErrorsComponent } from '../shared/list-errors.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ListErrorsComponent
]
})
export class AuthComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor() {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl(''));
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe({
      next: data => this.router.navigateByUrl('/'),
      error: err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    });
  }
}
