import {Currency} from "./currency";
import {Observable} from "rxjs";

export interface ExchangeRate extends Currency{
  pic: string;
  rate: Observable<string>;
}
