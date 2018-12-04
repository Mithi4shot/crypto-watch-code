import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { CurrencyListComponent } from './all-currency/currency-list/currency-list.component';
import { AllCurrencyModule } from './all-currency/all-currency.module';
import { ChartModule } from './chart/chart.module';

import { CryptoService } from './core/service/crypto.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AllCurrencyModule,
    ChartModule,
    NgHttpLoaderModule,
    RouterModule.forRoot([
      {path:'', component:CurrencyListComponent}
    ])

  ],
  providers: [CryptoService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
