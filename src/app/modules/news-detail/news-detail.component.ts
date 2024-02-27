import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
import { blog } from 'src/app/services/blog/blog.interface';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
  private blogService = inject(BlogService);
  private titleService = inject(Title);
  public route = inject(Router);
  public acr = inject(ActivatedRoute);

  /**
   * Array of images
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
   * stores blog detail
   */
  public blogDetail = signal<blog>(this.route.getCurrentNavigation()?.extras?.state?.blog);

  /**
   * stores blog image
   */
  public blogImage = signal(this.route.getCurrentNavigation()?.extras?.state?.blogImage);

  /**
   * Splits Message and links
   */
  public dailyBlogSplited = signal(
    this.route
      .getCurrentNavigation()
      ?.extras?.state?.blog?.message.split('Sources for my research include the following:')
  );

  /**
   * Checks route url and returns true or false 
   */
  checkRouteSig = signal<boolean>(this.route.url.includes('newshistory'))

  /**
   * Get blog by id and title observable
   */
  getBlogById$ = of(this.acr.snapshot.params).pipe(
    filter(params => !!(params['id'] && params['title'])),
    switchMap(param => this.blogService.getBlogById(param['id'], param['title'])),
    tap(res => {
      this.blogDetail.set(res);
      var randomNumber = Math.floor(Math.random() * 15) + 1;
      this.dailyBlogSplited.set(
        res.message.replaceAll('\\n', '<br/>').split('Sources for my research include the following:')
      );
      this.blogImage.set(this.blogImages()[randomNumber]);
      setTimeout(() => {
        this.splitMessageAndLink();
      });
    })
  );

  ngOnInit(): void {
    if (!this.route.url.includes('newshistory')) {
      setTimeout(() => {
        this.splitMessageAndLink();
      });
    }
  }

  /**
   * Splits the message into details and links
   */
  splitMessageAndLink(): void {
    this.titleService.setTitle('News | AI Powered Investment- Uvest4U');
    if (this.dailyBlogSplited()[1]) {
      this.dailyBlogSplited.update(dailyBlogSplitedSig => {
        dailyBlogSplitedSig.map((sig: string, i: number) => {
          if (i == 1) {
            sig = sig.replace('<br>', '');
          }
          return sig;
        });
        return dailyBlogSplitedSig;
      });
      var tempContainer = document.createElement('div');
      tempContainer.innerHTML = this.dailyBlogSplited()[1];

      // Find all anchor elements within the temporary container
      var anchorElements = tempContainer.querySelectorAll('a');

      // Iterate over each anchor element
      anchorElements.forEach(function (anchor) {
        // Create a new list item element
        var listItem = document.createElement('li');
        anchor.setAttribute('target', '_blank');
        // Replace the anchor element with the list item
        anchor?.parentNode?.replaceChild(listItem, anchor);

        // Append the anchor element to the list item
        listItem.appendChild(anchor);
      });
      let ele = document.querySelector('.resourcebx-right ol');
      if (ele) {
        ele.innerHTML = tempContainer.innerHTML;
      }
    }
  }
}
