import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {catchError, switchMap, take} from "rxjs/operators";

@Injectable()
export class HttpAuthInterceptService implements HttpInterceptor {
    inflightAuthRequest: any = null;

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders = new HttpHeaders();
        const hasAccept: boolean = request.headers.has('Accept');
        if (!hasAccept) {
            newHeaders = newHeaders.append('Accept', 'application/json');
        }
        const hasContentType: boolean = request.headers.has('Content-Type');
        if (!hasContentType) {
            newHeaders = newHeaders.append('Content-Type', 'application/json; charset=utf-8');
        }
        let basicAuthRequest = request.clone({headers: newHeaders});
        let hasSkipAuth: boolean = request.headers.has('Skip-auth');

        if (!this.inflightAuthRequest) {
            this.inflightAuthRequest = of(localStorage.getItem('core_spa_user_token'));
        }

        return this.inflightAuthRequest.pipe(
            take(1),
            switchMap((newToken: string) => {
                this.inflightAuthRequest = null;
                let token = newToken || '';
                if (!hasSkipAuth) {
                    return next.handle(basicAuthRequest.clone({
                        headers: basicAuthRequest.headers.append('Authorization', `Bearer ${token}`)
                    }));
                } else {
                    return next.handle(basicAuthRequest);
                }
            }),
            catchError(error => {
                let unauthorized = false;
                if (error && error.statusText) {
                    unauthorized = !!error.statusText.match(/Unauthorized/g);
                }
                if (error.status === 401 || unauthorized) {
                    localStorage.removeItem('core_spa_user_token');
                    localStorage.removeItem('user_email');
                    localStorage.removeItem('user_userName');
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            }) as any
        )
    }
}
