import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SysData } from '../models/sysData';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    constructor(private http: HttpClient) { }
        


    // create a method to get sysdata
    public GetSysData(groupName: string, codeName: string = null) {
        if (codeName) {
            return this.http.get<SysData[]>(`${environment.apiBaseUrl}/sysdata/CodeName/${groupName}/${codeName}`)
                .pipe(map(res => res || [])); // If no data is returned, default to an empty array
        } else {
            return this.http.get<SysData[]>(`${environment.apiBaseUrl}/sysdata/GroupName/${groupName}`)
                .pipe(map(res => res || [])); // If no data is returned, default to an empty array
        }
    }
}
