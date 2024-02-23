import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    subject: Subject<any> = new Subject<any>();
    observable: Observable<any> = this.subject.asObservable();

    constructor(
        private http: HttpClient
    ) {
    }

    getLifeCycleSignals(id: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/TradeSignal/Parent/DTO/' + id);
    }

    getMarketSentiment(month: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/TradeSignal/Summary/MktSentiment/-${month}`);
    }

    getSummaryBySignalType(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/TradeSignal/Summary/SignalType/');
    }

    getSummaryBysectorType(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/TradeSignal/Summary/Sector');
    }

    getPriceTechnicalsBySymbolAndDateRange(symbol: any, startDate: any, endDate: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/pricetechnicals/SymbolDateWithPrice/${symbol}/${startDate}/${endDate}`);
    }

    getPriceTechnicalsBySymbolAndDateRange1(symbol: any, startDate: any, endDate: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/price/SymbolDate/${symbol}/${startDate}/${endDate}`);
    }

    getInvestorHoldings(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/Investor/Holdings');
    }

    putInvestorHolding(data: any): Observable<any> {
        return this.http.put(environment.apiBaseUrl + '/Investor/PutHolding/', data);
    }

    deleteInvestorHolding(id: any): Observable<any> {
        return this.http.delete(environment.apiBaseUrl + '/Investor/DelHolding/' + id);
    }

    getIInvestorHoldingByHoldingId(id: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/Investor/HoldingById/' + id);
    }

    profileget(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/Account/profile');
    }

    //holding -> piechart
    getAssetAllocations(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/Investor/Allocation');
    }

    getInvHoldings(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/news/invholdings');
    }

    //add holding symbol get
    get_symbol(data: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/Symbols/like/${data}`)
    }

    // circle data
    circle_data(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + '/Symbols/SectorList')
    }

    //contact -> signal
    contact_signal(data: any): Observable<any> {
        return this.http.put(environment.apiBaseUrl + '/Message', data)
    }

    //edit profile
    edit_profile(data: any): Observable<any> {
        return this.http.post(environment.apiBaseUrl + '/Account/Update', data)
    }

    //change pass
    change_pass(data: any): Observable<any> {
        return this.http.post(environment.apiBaseUrl + '/account/pw', data)
    }

    //reset send mail
    requestReset(body: any): Observable<any> {
        return this.http.post(`${environment.apiBaseUrl}/account/initializeresetpw`, body);
    }

    //reset password
    newPassword(body: any): Observable<any> {
        return this.http.post(`${environment.apiBaseUrl}/account/finalizeResetPW/`, body);
    }

    cancelSubscription(body?: any) {
        return this.http.post(`${environment.apiBaseUrl}/Account/Cancel`, body);
    }

    underConstruction() {
        return this.http.get(`${environment.apiBaseUrl}/sysdata/CodeNAme/SITEMANAGEMENT/UNDERCONSTRUCT`);
    }

    getQuestions() {
        return this.http.get(`${environment.apiBaseUrl}/Profiler/GetCurrentQuestionnaire`);
    }

    getBlogsBySymbol(data: any): Observable<any> {
        return this.http.get(environment.apiBaseUrl + `/Blog/GetRecentBlogBySymbol/${data}`)
    }

    saveResponse(body?: any) {
        return this.http.post(`${environment.apiBaseUrl}/Profiler/AnalyzeResponses`, body, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }
    captureDetails(body?: any) {
        return this.http.post(`${environment.apiBaseUrl}/account/marketing`, body, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }
    getDailyBlog() {
        return this.http.get(`${environment.apiBaseUrl}/Blog/GetOneSymbolBlogForToday`);
    }
}
