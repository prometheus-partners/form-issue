import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'form-container-issue';
  tableConfigData: any;

  constructor() {
    this.tableConfigData = {
      name: 'amount',
      selector: 'number',
      validators: [
        {
          name: 'min',
          value: 1,
          class: 'builtin',
          type: 'sync',
          trigger: 'onWrite'
        }
      ]
    }
  }

  ngOnInit() {
    console.log(this.tableConfigData)
  }

}
