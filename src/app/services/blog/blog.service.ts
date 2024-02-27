import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { blog } from './blog.interface';
import { CustomOperators } from 'src/app/shared/operators/custom-operators';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private operator = inject(CustomOperators);

  /**
   * It will give the array of blogs
   * @returns Blog list observable
   */
  getBlogs(): Observable<blog[]> {
    return this.http
      .get<blog[]>(`/Blog/GetCurrentBlog`)
      .pipe(this.operator.extractResponseOnly());
  }
  /**
   * It will give the daily investment idea blog
   * @returns Daily investment idea blog observable
   */
  getDailyBlog(): Observable<blog> {
    return this.http.get<blog>(`/Blog/GetOneSymbolBlogForToday`);
  }

  /**
   * 
   * It will give the id and title wise blog detail
   * @param id it is a id of blog
   * @param title it is a title of blog
   * @returns blog observable
   */
  getBlogById(id:number,title:string):Observable<blog>{
    return this.http.get<blog>(`/Blog/GetBlogById/${id}/${title}`)
  }
}
