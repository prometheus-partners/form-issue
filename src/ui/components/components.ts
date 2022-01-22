import { FormTableFieldComponent } from './form-table/form-table-field/form-table-field.component';
import { FormTableComponent } from './form-table/form-table.component';
import { FormsComponents } from './forms/forms';

export * from './forms/forms';
export * from './form-table/form-table-field/form-table-field.component';
export * from './form-table/form-table.component';

export const UiComponents = [
  FormTableComponent,
  FormTableFieldComponent,
  ...FormsComponents,
];
