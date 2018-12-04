import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

import { CryptoService } from '../../core/service/crypto.service';

@Component({
  selector: 'app-price-chart-view',
  templateUrl: './price-chart-view.component.html',
  styleUrls: ['./price-chart-view.component.css']
})
export class PriceChartViewComponent implements OnInit {

  public id: any;
  public singleCurrencyData: any;
  LineChart = [];

  constructor(public cryptoservice: CryptoService, private router: Router,  public _route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getSingleData();
  }

  public getSingleData = () => {

    this.cryptoservice.getSingleCurrencyData(this.id).subscribe((apiResponse) => {
      this.singleCurrencyData = apiResponse.data;
      
      /*LineChart*/
      this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: [0, 24],
          datasets: [
            {
              label: this.singleCurrencyData.name,
              data: [{
                x: 0,
                y: this.singleCurrencyData.quotes.USD.price - (this.singleCurrencyData.quotes.USD.price * this.singleCurrencyData.quotes.USD.percent_change_24h/100)
              }, {
                x: 24,
                y: this.singleCurrencyData.quotes.USD.price
              }], 
              fill: false,
              lineTension: 0.2,
              borderColor: "blue",
              borderWidth: 2
            }]
        },
        options: {
          title: {
            text: "Line Chart",
            display: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })

    })

  }

  backHandler = () => {
    this.router.navigateByUrl("/");
  }

}
