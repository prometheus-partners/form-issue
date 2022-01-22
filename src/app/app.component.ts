import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-container-issue';
  shiftBreakData: any;

  constructor() {

    const shiftBreaks = [
      { amount: 1, breakId: 'm2g2gvNBAGlAgsXsmycp' },
      { amount: 3, breakId: '9Hjp3MheJLY3qhftSZvz' },
    ];
    const shiftBreaksObservable = of(shiftBreaks);

    this.shiftBreakData = {
      sourceObservable: shiftBreaksObservable,
      inputType: [
        {
          name: 'amount',
          selector: 'number',
          validators: [
            { name: 'min', value: 1, class: 'builtin', type: 'sync', trigger: 'onWrite' },
          ]
        },
      ]
    }

  }

  ngOnInit() {
    console.log(this.shiftBreakData);
  }

  updateBreaks(shiftBreaks: any) {
  }


}
