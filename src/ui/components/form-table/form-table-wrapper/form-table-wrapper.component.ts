import { FormTableTemplate } from '@prometheuspartners/pp-types';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'pol-form-table-wrapper',
  templateUrl: './form-table-wrapper.component.html',
  styleUrls: ['./form-table-wrapper.component.scss']
})

export class FormTableWrapperComponent implements OnChanges {
  @Input() wrapperData: FormTableTemplate;
  @Output() dataOutput = new EventEmitter();

  formTableData: FormTableTemplate;
  newObservable: Observable<any>;
  dataArray = [];

  initializeFormTable = false;

  ngOnChanges() {
    this.initialize();
  }

  constructor() {}

  initialize() {
    
    const field = this.wrapperData.inputType[0].name;

    if (this.wrapperData.sourceObservable) {

      this.wrapperData.sourceObservable.subscribe(data => {
        this.formTableData = null;
        this.dataArray = [];
        
        if (data) {
          data.forEach(value => {
            const newData = {
              [field]: value
            }
            this.dataArray.push(newData);
          });
          this.newObservable = from([this.dataArray]);

          this.formTableData = {
            sourceObservable: this.newObservable,
            inputType: this.wrapperData.inputType,
          }
        }

      });
    }
  }

  transformData(data: any) {
    const newOutputData = [];
    data.forEach(obj => {
      const value = Object.values(obj);
      newOutputData.push(value[0]);
    });
    this.dataOutput.emit(newOutputData);
  }

}
