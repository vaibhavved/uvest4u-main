import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    islogin: BehaviorSubject<boolean>;

    constructor() {
        const token = localStorage.getItem('core_spa_user_token');
        this.islogin = new BehaviorSubject<boolean>(!!token);
    }
}
