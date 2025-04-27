import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';

import { UserService } from '../core';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private userService = inject(UserService);
  private viewContainer = inject(ViewContainerRef);


  condition: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

}
