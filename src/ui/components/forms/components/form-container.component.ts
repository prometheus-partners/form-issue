import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pol-form-container',
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="submitForm()">
      <ng-content></ng-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormContainerComponent {
  @Input() public form: FormGroup;
  @Input() public model = {};
  @Input() public id: string;
  @Input() public options = {};
  @Output() public action = new EventEmitter();

  submitForm() {
    this.action.emit({ type: 'SUBMIT', payload: this.model });
  }
}
