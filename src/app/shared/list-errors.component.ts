import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Errors } from "../core";

@Component({
  selector: "app-list-errors",
  template: `
    <ul class="error-messages" *ngIf="errorList">
      <li *ngFor="let error of errorList; trackBy: trackByFn">
        {{ error }}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
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
