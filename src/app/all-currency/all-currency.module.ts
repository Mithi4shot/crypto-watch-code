import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CurrencyListComponent } from './currency-list/currency-list.component';
import { LongPress } from '../core/directives/long-press.directive'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    LongPress, 
    CurrencyListComponent
  ]
})
export class AllCurrencyModule { }
