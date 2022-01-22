import { Observable } from 'rxjs';

export interface FormTableTemplate {
  sourceObservable: Observable<any>;
  inputType: InputType[];
}
export interface InputType {
  name: string;
  selector: 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'dateTime';
  valueSet?: Observable<any>;
  attributeType?: string;
  attributeGroup?: string;
  labelKey?: string;
  disabled?: 'onCreate' | 'onUpdate' | 'onWrite';
  validators?: Array<Validator>;
}
export interface Validator {
  name: string;
  value?: number;
  class: 'builtin' | 'custom';
  type: 'sync' | 'async';
  trigger: 'onCreate' | 'onUpdate' | 'onWrite';
}
