import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-layout-footer',
  template: `
  <footer>
  <div class="container">
    <a class="logo-font" routerLink="/">conduit</a>
    <span class="attribution">
      &copy; {{ today | date: 'yyyy' }}.
      An interactive learning project from <a href="https://thinkster.io">Thinkster</a>.
      Code licensed under MIT.
    </span>
  </div>
</footer>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe]
})
export class FooterComponent {
  today: number = Date.now();
}
