import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PriceChartViewComponent } from './price-chart-view/price-chart-view.component';
import {ComparePriceComponent} from './compare-price/compare-price.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'priceChart/:id', component: PriceChartViewComponent },     
      { path: 'comparePrice', component: ComparePriceComponent },     
    ])
  ],
  declarations: [
    PriceChartViewComponent,
    ComparePriceComponent
  ]
})
export class ChartModule { }
