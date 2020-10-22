import {Component, OnInit} from '@angular/core';
import {DataChart} from "../models/dataChart";
import {ApiService} from "../services/api.service";
import {Currency} from "../models/currency";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  currency: Currency = {base: 'EUR', to: 'PLN'};
  dataChart: DataChart;

  title = `Currency: ${this.currency.base} to ${this.currency.to}`;
  type = 'LineChart';
  data = [];
  columnNames = ['Data', `${this.currency.to}`];
  options = {colors: ['#e0440e',], is3D: true};
  width = 1068;
  height = 800;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getHistoricalRateUsingSubscribe();
  }

  getHistoricalRateUsingSubscribe(): void {
    this.apiService.getHistoricalRate({base: 'EUR', to: 'PLN'}).subscribe((data: DataChart) => {
      this.dataChart = data;
      const dates = Object.keys(this.dataChart.rates);
      const rates = Object.values(this.dataChart.rates);

      for (let i = 0; i < rates.length; i++) {
        this.data.push([dates[i], Object.values(rates[i])[0]])
      }
      this.data.sort(((a: number, b: number) => a > b ? 1 : -1));
      console.log(this.data);
    })
  }
}

