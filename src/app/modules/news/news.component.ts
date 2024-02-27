import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, SafeResourceUrl, Title } from '@angular/platform-browser';
import { blog } from '../../services/blog/blog.interface';
import { HeaderService } from 'src/app/services/header/header.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { BlogService } from 'src/app/services/blog/blog.service';
import { Router } from '@angular/router';
import { catchError, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  private blogService = inject(BlogService);

  private headerService = inject(HeaderService);

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
  public blogImages = signal([
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
    'image9.jpg',
    'image10.jpg',
    'image11.jpg',
    'image12.jpg',
    'image13.jpg',
    'image14.jpg',
    'image15.jpg'
  ]);

  /**
   * Get blog observable
   */
  getBlogs$ = this.blogService.getBlogs().pipe(shareReplay(1),
    tap((res: blog[]) => {
      res.forEach((item: blog) => {
        item.message = item.message.replace(/\\n/g, '<br />');
        item.message = item.message.replace(/\\r/g, '');
        return item;
      });
    })
  );

  /**
   * Get user token observable
   */
  getLoggdIn$ = this.headerService.islogin.pipe(
    tap(res => {
      this.token = localStorage.getItem('core_spa_user_token') || '';
    })
  );

  ngOnInit(): void {
    this.metaService.addTags([
      {
        name: 'description',
        content:
          'Unlock superior returns with Uvest4U! Discover AI-driven investment insights through our blogs and make smarter financial decisions today.'
      }
    ]);
    this.titleService.setTitle('News | AI Powered Investment- Uvest4U');
  }

  /**
   * redirects to news detail page with single blog detail
   * @param blog gives single blog detail
   * @param index gives the index of clicked blog
   */
  redirectToDetail(blog: blog, index: number): void {
    let year = moment(blog.createDate).format('YYYY');
    let month = moment(blog.createDate).format('MM');
    let day = moment(blog.createDate).format('DD');
    this.route.navigate(['/news/' + year + '/' + month + '/' + day + '/' + blog.title.replace(/\s+/g, '-')], {
      state: { blog: blog, blogImage: this.blogImages()[index] }
    });
  }
}
