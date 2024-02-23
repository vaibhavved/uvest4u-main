import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PriceTechnicals} from "../models/pricetechnicals";
import { MktSymbol } from '../models/mktsymbol';

@Injectable({
    providedIn: 'root'
})
export class SecMasterService {

    constructor(
        private http: HttpClient
    ) {
    }

    getBySymbol(symbol: string): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/Symbols/${symbol}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getPriceTechnicalsBySymbolAndDateRange(symbol: any, startDate: any, endDate: any): Observable<PriceTechnicals[]> {
        return this.http.get<PriceTechnicals[]>(environment.apiBaseUrl + `/pricetechnicals/SymbolDateWithPrice/${symbol}/${startDate}/${endDate}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    // Create a method that calls the API to get the list of symbols
    getRealTimeSymbols(): Observable<MktSymbol[]> {       
        return this.http.get<MktSymbol[]>(environment.apiBaseUrl + `/Symbols/RealTimeList`);
    };


    

}
