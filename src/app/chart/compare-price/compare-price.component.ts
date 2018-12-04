import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

import { CryptoService } from 'src/app/core/service/crypto.service';

@Component({
  templateUrl: './compare-price.component.html',
})
export class ComparePriceComponent implements OnInit {

  LineChart = [];
  constructor(public cryptoservice: CryptoService, private router: Router) { }

  ngOnInit() {
    this.initChart();
  }

  public initChart = () => {

      const dataToCompare = this.cryptoservice.getCurrenciesToCompare();
      /*LineChart*/
      this.LineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: [0, 24],
          datasets: [
            {
              label: dataToCompare[0].name,
              data: [{
                x: 0,
                y: dataToCompare[0].quotes.USD.price - (dataToCompare[0].quotes.USD.price * dataToCompare[0].quotes.USD.percent_change_24h/100)
              }, {
                x: 24,
                y: dataToCompare[0].quotes.USD.price
              }], 
              fill: false,
              lineTension: 0.2,
              borderColor: "blue",
              borderWidth: 2
            },
            {
              label: dataToCompare[1].name,
              data: [{
                x: 0,
                y: dataToCompare[1].quotes.USD.price - (dataToCompare[1].quotes.USD.price * dataToCompare[1].quotes.USD.percent_change_24h/100)
              }, {
                x: 24,
                y: dataToCompare[1].quotes.USD.price
              }], 
              fill: false,
              lineTension: 0.2,
              borderColor: "red",
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

  }

  backHandler = () => {
    this.router.navigateByUrl("/");
  }
}