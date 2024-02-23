import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    isSiteUnderMaintenance: boolean = false;

    constructor(
        private http: HttpClient,
    ) {
    }

    // to-store-token....
    loggedin() {
        return !!localStorage.getItem('core_spa_user_token');
    }


    login(data: any): Observable<any> {
        return this.http.post(environment.apiBaseUrl + "/account/login", data, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    reactivate(data: any): Observable<any> {
        return this.http.post(environment.apiBaseUrl + "/Account/reactivate", data, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    registration(data: any): Observable<any> {
        return this.http.post(environment.apiBaseUrl + "/account/register", data, {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    getToken() {
        return localStorage.getItem("core_spa_user_token");
    }

    logout() {
        return localStorage.removeItem('core_spa_user_token')
    }

    getTodaySignals(): Observable<any> {
        return this.http.get(environment.apiBaseUrl + "/TradeSignal/TodaySignals", {
            headers: new HttpHeaders().set('Skip-auth', 'true')
        });
    }

    registerSuccess(user : any) {
        return this.http.post(environment.apiBaseUrl + `/account/registerSuccess/${user}`, user)
    }
}
