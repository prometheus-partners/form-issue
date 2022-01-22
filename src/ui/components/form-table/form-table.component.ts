import { FormTableTemplate } from '../../models/form-table.model';
import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pol-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})

export class FormTableComponent {
  @Input() public set tableData(newTableData) {
    if (this._tableData !== newTableData) {
      this._tableData = newTableData;
      const formArray = this.formTable.get('rows') as FormArray;
      formArray.clear();
      this.initialize();
    }
  }

  @Output() public dataUpdate = new EventEmitter<{ data: any }>();
  @Output() public rowUpdate = new EventEmitter<{ data: any, action: 'update' | 'delete' }>();

  _tableData: FormTableTemplate;
  formTable: FormGroup;
  outputData: any;
  rowOutputData: any;

  constructor(
    private fb: FormBuilder,
  ) {
    this.formTable = new FormGroup({
      rows: new FormArray([])
    });
  }

  initialize() {
    console.log('initialize ran');
    this._tableData.sourceObservable.subscribe(valueArray => {
      this.formTable = new FormGroup({
        rows: new FormArray([])
      });
      valueArray.forEach((value: any, index: number) => {
        const formArray = this.formTable.get('rows') as FormArray;
        formArray.push(this.generateBaseFormGroup(value));
        formArray.get(index.toString()).patchValue(value);
      });
      console.log('this.form => ', this.formTable);
      console.log('this._tableData => ', this._tableData);
    });

  }

  generateBaseFormGroup(values) {
    const formGroup = new FormGroup({});

    for (const field of this._tableData.inputType) {
      formGroup.addControl(field.name, new FormControl());
      formGroup.addControl('isEditable', new FormControl(false));
      formGroup.disable();
    }

    for (const field in values) {
      if (values[field] && !this.formTable.get(field)) {
        formGroup.addControl(field, new FormControl());
        formGroup.addControl('isEditable', new FormControl(false));
        formGroup.disable();
      }

    }

    return formGroup;
  }

  addRow() {
    const formGroup = new FormGroup({});
    const formArray = this.formTable.get('rows') as FormArray;

    this._tableData.inputType.forEach(input => {
      formGroup.addControl(input.name, new FormControl());
      formGroup.addControl('isEditable', new FormControl(true));
      formGroup.controls[`${input.name}`].enable();

      if (input.disabled === 'onCreate' || input.disabled === 'onWrite') {
        console.log('set to disable');
        formGroup.controls[`${input.name}`].disable();
      } else {
        console.log('set validators');
        if (input.validators) {
          for (const validator of input.validators) {
            if (validator.trigger === 'onCreate' || validator.trigger === 'onWrite') {
              if (validator.type === 'sync') {
                switch (validator.name) {
                  case 'required':
                    formGroup.controls[`${input.name}`].setValidators([Validators.required]);
                    break;
                  case 'min':
                    formGroup.controls[`${input.name}`].setValidators([Validators.min(validator.value)]);
                    break;
                  case 'max':
                    formGroup.controls[`${input.name}`].setValidators([Validators.min(validator.value)]);
                    break;
                  default:
                    break;
                }
              }
            }
          }
        };
      }
    });

    formArray.push(formGroup);
    console.log(this.formTable.controls);

  }

  deleteRow(index: number) {

    const formArray = this.formTable.get('rows') as FormArray;
    this.rowOutputData = formArray.getRawValue();

    for (const row of this.rowOutputData) {
      delete row.isEditable;
    }

    this.rowUpdate.emit({ data: this.rowOutputData[index], action: 'delete' });
    formArray.removeAt(index);

    this.outputData = formArray.getRawValue();

    for (const row of this.outputData) {
      delete row.isEditable;
    }
    this.dataUpdate.emit(this.outputData);

  }

  editRow(index: number) {
    const formArray = this.formTable.get('rows') as FormArray;

    formArray.at(index).get('isEditable').setValue(true);
    formArray.at(index).enable();
    this._tableData.inputType.forEach(input => {
      if (input.disabled === 'onWrite' || input.disabled === 'onUpdate') {
        console.log('set to disable');
        formArray.at(index).get(input.name).disable();
      } else {
        console.log('set validators');
        if (input.validators) {
          for (const validator of input.validators) {
            if (validator.trigger === 'onWrite' || validator.trigger === 'onUpdate') {
              if (validator.type === 'sync') {
                switch (validator.name) {
                  case 'required':
                    formArray.at(index).get(input.name).setValidators([Validators.required]);
                    break;
                  case 'min':
                    formArray.at(index).get(input.name).setValidators([Validators.min(validator.value)]);
                    break;
                  case 'max':
                    formArray.at(index).get(input.name).setValidators([Validators.min(validator.value)]);
                    break;
                  default:
                    break;
                }
              }
            }
          }
        };
      }
    });
  }


  doneRow(index: number) {

    const formArray = this.formTable.get('rows') as FormArray;

    this.outputData = formArray.getRawValue();

    for (const row of this.outputData) {
      delete row.isEditable;
    }

    this.dataUpdate.emit(this.outputData);
    this.rowUpdate.emit({ data: this.outputData[index], action: 'update' });

    formArray.at(index).get('isEditable').setValue(false);
    formArray.at(index).disable();

  }
}
