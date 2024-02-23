import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { blog } from 'src/app/services/blog/blog.interface';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {

  private route = inject(Router);

  /**
   * stores blog detail
   */
  public blogDetail: blog = this.route.getCurrentNavigation()?.extras?.state?.blog;

  /**
   * stores blog image
   */
  public blogImage = this.route.getCurrentNavigation()?.extras?.state?.blogImage;

  /**
  * Splits Message and links
  * 
  */
  public dailyBlogSplited = this.route.getCurrentNavigation()?.extras?.state?.blog?.message.split('Sources for my research include the following:');

  ngOnInit(): void {
    if (this.dailyBlogSplited[1]) {
      this.dailyBlogSplited[1] = this.dailyBlogSplited[1].replace('<br>','');
      var tempContainer = document.createElement('div');
      tempContainer.innerHTML = this.dailyBlogSplited[1];

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
