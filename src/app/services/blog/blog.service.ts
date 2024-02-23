import { Injectable, inject } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { blog } from './blog.interface';
import { CustomOperators } from 'src/app/shared/operators/custom-operators';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   * 
   * @returns Blog list observable
   */
  getBlogs(): Observable<blog[]> {
    return this.http.get<blog[]>(`${environment.apiBaseUrl}/Blog/GetCurrentBlog`).pipe(this.operator.extractResponseOnly());
  }
}
