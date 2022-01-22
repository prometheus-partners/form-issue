import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputNumberComponent } from '../../forms/components/input-number.component';


@Component({
  selector: 'pol-form-table-field',
  templateUrl: './form-table-field.component.html',
  styleUrls: ['./form-table-field.component.scss'],
})

export class FormTableFieldComponent implements OnInit {
  @Input() public formField: FormGroup;
  @Input() public tableConfig: any;
  @Input() public fieldWidth?: number;
  // @Input() public rowData: Array<FormControl>;
  @Input() public index: number;
  @ViewChild('inputField', { read: ViewContainerRef, static: true }) viewRef;
  // @ViewChild('inputField', { read: ViewContainerRef, static: false }) viewRef: ViewContainerRef;


  tableConfigData: any;
  fieldCount = 0;
  defaultFieldWidth = 1280;
  tableWidth = 0;

  constructor(
    private cfr: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    for (const formFieldName of Object.keys(this.formField.value)) {
      const formFieldValue = this.formField.value[formFieldName];
      this.getTableConfigData(formFieldName, this.tableConfig, this.index);
    }    
    console.log(this.formField)
  }

  getTableConfigData(formFieldName: string, tableConfigData: any, index: number) {
    tableConfigData.forEach(tableRow => {
      for (const fieldName of Object.keys(tableRow)) {
        const fieldValue = tableRow[fieldName];
        if (formFieldName === fieldValue) {
          this.tableConfigData = tableConfigData.find(obj => {
            return obj.name === formFieldName;
          });
          this.createField(this.tableConfigData, index);
        }
      }
    });
  }

  createField(tableConfigData: any, index: number) {
    console.log('tableConfigData => ', tableConfigData)

    let component: any;
    let fieldWidth = 0;
    switch (tableConfigData.selector) {
      // case 'text':
      //   component = InputComponent;
      //   fieldWidth = 300;
      //   break;
      case 'number':
        component = InputNumberComponent;
        fieldWidth = 100;
        break;
      // case 'select':
      //   component = SelectComponent;
      //   fieldWidth = 200;
      //   break;
      // case 'checkbox':
      //   component = InputCheckboxComponent;
      //   fieldWidth = 300;
      //   break;
      // case 'date':
      //   component = InputDateComponent;
      //   fieldWidth = 200;
      //   break;
      // case 'dateTime':
      //   component = InputDateTimeComponent;
      //   fieldWidth = 300;
      //   break;
      case 'default':
        fieldWidth = 300;
        break;
    }
    this.tableWidth += fieldWidth;

    console.log(component);
    const factory = this.cfr.resolveComponentFactory(component);
    console.log(factory);

    const inputComponent = this.viewRef.createComponent(factory);

    inputComponent.instance.controlPath = this.formField + '.' + index + '.' + tableConfigData.name;
    // inputComponent.location.nativeElement.style = 'margin: 0px 8px;';
    const fieldWidthSetting = 'width: ' + fieldWidth.toString() + 'px;';
    inputComponent.location.nativeElement.style = fieldWidthSetting;

    if (tableConfigData.attributeType && tableConfigData.attributeGroup) {
      inputComponent.instance.attributeType = tableConfigData.attributeType;
      inputComponent.instance.attributeGroup = tableConfigData.attributeGroup;
      inputComponent.instance.labelKey = 'value';
    }

    if (tableConfigData.valueSet) {
      inputComponent.instance.valueSet = tableConfigData.valueSet;

      if (tableConfigData.labelKey) {
        inputComponent.instance.labelKey = tableConfigData.labelKey;
      }
    }

    if (tableConfigData.disabled) {
      this.formField.get(tableConfigData.name).disable();
    }

  }

  public createDynamicComponent<T>(component: Type<T>, viewRef: ViewContainerRef): ComponentRef<T> {
    const factory = this.cfr.resolveComponentFactory<T>(component);
    return viewRef.createComponent(factory);
  }
}
