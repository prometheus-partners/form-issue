import { Input, Host, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormContainerComponent } from './form-container.component';

@Injectable()
export abstract class InputBaseComponent {
  @Input() public controlPath: string;
  @Input() public formControlName?: string;
  @Input() public showHint?: boolean;
  @Input() public disabled?: boolean;

  constructor(@Host() public parent: FormContainerComponent) {}
  get errorLabel() {
    const key = Object.keys(this.control.errors)[0].toUpperCase();
    return `ERRORS.${key}`;
  }
  public get control() {
    let result: FormControl;
    this.controlPath.split('.').forEach((path) => {
      result = result
        ? (result.get(path) as FormControl)
        : (this.parent.form.get(path) as FormControl);
    });
    return result;
  }
  get label() {
    return `LABELS.${this.path}`;
  }
  get hint() {
    return `HINTS.${this.path}`;
  }
  private get path() {
    const path = this.controlPath.split('.');
    return path[path.length - 1].toUpperCase();
  }

  hasError(error?: string | null) {
    if (error) {
      return this.control.hasError(error);
    } else {
      return !!this.control.errors;
    }
  }
  hasValidator(validator: string): boolean {
    const v = this.control.validator;
    const vv = v ? v(this.control) : null;
    return vv ? vv.hasOwnProperty(validator) : false;
  }
}
