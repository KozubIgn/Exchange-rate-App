import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExchangeRate} from "../models/exchangeRate";
import {Currency} from '../models/currency';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dateFrom = '2015-10-15';
  private dateTo = '2020-10-20';
  private url = 'https://api.exchangeratesapi.io';

  constructor(private  http: HttpClient) {
  }

  getExchangeRate(currencies: Currency): Observable<ExchangeRate> {
    return this.http.get(`${this.url}/latest?base=${currencies.base}&symbols=${currencies.to}`)
      .pipe(map((data: { rates }) => {
          return {
            base: currencies.base,
            to: currencies.to,
            pic: '',
            rate: data.rates[currencies.to]
          };
        })
      );
  }

  getHistoricalRate(currencies: Currency): any {
    return this.http.get(`https://api.exchangeratesapi.io/history?start_at=2020-09-10&end_at=2020-10-20&base=${currencies.base}&symbols=${currencies.to}`);
  }
}
