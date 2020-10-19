import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExchangeRate} from "../models/exchangeRate";
import {Currencies} from '../models/currencies';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.exchangeratesapi.io';

  constructor(private  http: HttpClient) {
  }

  getExchangeRate(currencies: Currencies): Observable<ExchangeRate> {
    return this.http.get(`${this.url}/latest?base=${currencies.base}&symbols=${currencies.to}`)
      .pipe(map((data: { rates }) => {
          console.log(data);
          return {
            rate: data.rates[currencies.to]
          };
        })
      );
  }
}
