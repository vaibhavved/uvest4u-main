import { Component, inject } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, SafeResourceUrl, Title } from '@angular/platform-browser';
import { blog } from '../../services/blog/blog.interface';
import { HeaderService } from 'src/app/services/header/header.service';
import moment from "moment";
import Swal from "sweetalert2";
import { BlogService } from 'src/app/services/blog/blog.service';
import { Router } from '@angular/router';
import {  catchError, tap } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  private blogService = inject(BlogService);

  /**
   *  header service injection
   */
  private headerService = inject(HeaderService)


  private metaService = inject(Meta);

  private titleService = inject(Title);

  /**
  *  Auth token
  */
  private token: string = '';

  private route = inject(Router);


  /**
   * Blog image list
   */
  public blogImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg'];

  /**
   * Get blog observable
   */
  getBlogs$ = this.blogService.getBlogs().pipe(
    tap((res: blog[]) => {
        res.forEach((item: blog) => {
          item.message = item.message.replace(/\\n/g, '<br />');
          item.message = item.message.replace(/\\r/g, '');
          return item;
        });
      }
    ));


  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Unlock superior returns with Uvest4U! Discover AI-driven investment insights through our blogs and make smarter financial decisions today.' },
    ]);
    this.titleService.setTitle("Blogs | AI Powered Investment- Uvest4U");
    this.headerService.islogin.subscribe(res => {
      this.token = localStorage.getItem('core_spa_user_token') || '';
    });
  }

  /**
   * 
   * @param blog gives single blog detail
   * redirects to news detail page with single blog detail
   */
  redirectToDetail(blog: blog, i: number): void {
    let year = moment(blog.createDate).format('YYYY');
    let month = moment(blog.createDate).format('MM');
    let day = moment(blog.createDate).format('DD')
    this.route.navigate(['/news/' + year + '/' + month + '/' + day + '/' + blog.title.replace(/\s+/g, '-')], { state: { blog: blog, blogImage: this.blogImages[i] } })
  }
}
