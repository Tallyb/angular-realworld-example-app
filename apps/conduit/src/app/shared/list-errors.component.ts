import { Component, Input, ChangeDetectionStrategy } from "@angular/core";


import { Errors } from "../core";

@Component({
  selector: "app-list-errors",
  template: `
    @if (errorList) {
      <ul class="error-messages">
        @for (error of errorList; track trackByFn($index, error)) {
          <li>
            {{ error }}
          </li>
        }
      </ul>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(
      (key) => `${key} ${errorList.errors[key]}`
    );
  }

  get errorList() {
    return this.formattedErrors;
  }

  trackByFn(index, item) {
    return index;
  }
}
