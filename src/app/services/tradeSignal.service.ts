import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TradeSignalService {

    constructor(
        private http: HttpClient) {
    }

    getMaxSignalDate(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/MaxSignalDate/`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getByDateAndSignalType(date: string, signalType: number): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/DateSignalType/${date}/${signalType}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getSymbolBySearch(symbol: string) {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/Symbol/DTO/${symbol}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getByDate(date: string): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/Date/${date}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getTSSummary(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/Summary/All`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getByParentId(parentId: number) {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/Parent/DTO/${parentId}`, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }
}
