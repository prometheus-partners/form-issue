import { Component, OnInit, Input, Host } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormContainerComponent } from './form-container.component';
import { InputBaseComponent } from './input-base.component';

@Component({
  selector: 'pol-input-number',
  template: `
    <mat-form-field [style.width]="'100%'">
      <input
        matInput
        type="number"
        placeholder="{{ label | translate }}"
        [formControl]="control"
      />
      <ng-content></ng-content>
      <mat-hint *ngIf="showHint">{{ hint | translate }}</mat-hint>
      <mat-error *ngIf="hasError()">{{ errorLabel | translate }}</mat-error>
    </mat-form-field>
  `,
})
// <input matInput type="number" placeholder="{{label | translate}}" [formControl]="control" style="text-align: right;">
export class InputNumberComponent extends InputBaseComponent implements OnInit {
  @Input() public controlPath: string;

  constructor(@Host() public parent: FormContainerComponent) {
    super(parent);
  }

  ngOnInit() {}
}
