import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsComponents } from './components/forms/forms';
import { UiComponents } from './components/components';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';

export const DependencyModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  MaterialModule,
  TranslateModule,
];

@NgModule({
  declarations: [
    ...UiComponents
  ],

  providers: [
    ...UiComponents,
    ...FormsComponents
  ],

  imports: [
    ...DependencyModules
  ],
  
  exports: [
    ...DependencyModules,
    ...UiComponents
  ],

  entryComponents: [
    ...FormsComponents
  ]

})
export class UiModule {}

declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}
