import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExchangeRate} from "../models/exchangeRate";
import {Currency} from '../models/currency';
import {map} from "rxjs/operators";
import {Result} from "../models/result";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  dateFrom: '2015-10-15';
  dateTo: '2020-10-20';
  private url = 'https://api.exchangeratesapi.io';

  constructor(private  http: HttpClient) {
  }

  getExchangeRate(currencies: Currency): Observable<ExchangeRate> {
    return this.http.get(`${this.url}/latest?base=${currencies.base}&symbols=${currencies.to}`)
      .pipe(map((data: { rates }) => {
          console.log(data);
          return {
            base: currencies.base,
            to: currencies.to,
            pic: '',
            rate: data.rates[currencies.to]
          };
        })
      );
  }

  getHistoricalRate(currencies: Currency) {
    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=${(this.dateFrom)}&end_at=${(this.dateTo)}&base=${currencies.base}&symbols=${currencies.to}`).pipe(
      map((data: { rates }) => {
        const result: Result = {
          name: currencies.to,
          value: []
        };
        for (let date in data.rates) {
          if (data.rates.hasOwnProperty(date)) {
            result.value.push({
              name: date,
              rateValue: data.rates[date][currencies.to]
            });
          }
        }
      }))
  }
}
