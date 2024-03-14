import { Component } from '@angular/core';
import { FormCompoent } from './formComponent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormCompoent],
  template: `
  <h1>Reactive Forms</h1>
  <form-component></form-component>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default';
}
