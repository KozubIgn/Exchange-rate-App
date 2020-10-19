import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../currency.service';
import {Observable} from "rxjs";
import {ExchangeRate} from "../models/exchangeRate";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {

  currencyRate: Observable<ExchangeRate>

  currencySign: string[] = ['USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK',
    'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyRate = this.currencyService.getExchangeRate({base: 'EUR', to: 'PLN'});
    console.log(this.currencyRate);
  }
}
