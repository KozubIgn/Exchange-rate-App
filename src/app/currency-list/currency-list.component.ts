import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ExchangeRate} from "../models/exchangeRate";
import {Currency} from "../models/currency";
import {Observable, of, Subject, timer} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  exchangeRate : ExchangeRate;

  currencySign: string[] = ['USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK',
    'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];


  constructor(private currencyService: ApiService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.currencyService.getExchangeRate({base: 'EUR', to: 'PLN'}).subscribe(data => {
      this.exchangeRate = data
    });
  }
}

