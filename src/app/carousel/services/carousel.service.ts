import {Injectable} from '@angular/core';
import {Observable, Subject, timer} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ExchangeRate} from "../../models/exchangeRate";
import {ApiService} from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient, private apiService: ApiService) {
  }

  private changeSlide = new Subject();

  private url = 'https://api.exchangeratesapi.io';
  exchangeRateList: ExchangeRate[] = [
    {base: 'EUR', to: 'GBP', pic: '../../assets/photo/couple.jpg', rate: new Observable()},
    {base: 'USD', to: 'GBP', pic: '../../assets/photo/dog.jpg', rate: new Observable()},
    {base: 'GBP', to: 'EUR', pic: '../../assets/photo/rabbit.jpg', rate: new Observable()}
  ]

  refreshRate(): void {
    for (const exchangeRate of this.exchangeRateList) {

      exchangeRate.rate = (timer(0, 1000)
        .pipe(
          concatMap(_ => (this.http.get(`${this.url}/latest?base=${exchangeRate.base}&symbols=${exchangeRate.to}`))),
          map((data: { rates: { 'CURRENCY': string } }) => data.rates[exchangeRate.to])
        ));
    }
  }

  getExchangeList(): any {
    return this.exchangeRateList;
  }
}
