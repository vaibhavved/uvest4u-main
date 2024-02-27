import { Component, ElementRef, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-investment-idea',
  templateUrl: './investment-idea.component.html',
  styleUrls: ['./investment-idea.component.scss']
})
export class InvestmentIdeaComponent {
  titleService = inject(Title);

  route = inject(Router);

  /**
   * Splits Message and links
   *
   */
  public dailyBlogSplited = signal(
    this.route
      .getCurrentNavigation()
      ?.extras?.state?.blogDetail?.message.split('Sources for my research include the following:')
  );

  /**
   * Gives Dailyblog Detail
   */
  public dailyBlogDetail = signal(this.route.getCurrentNavigation()?.extras?.state?.blogDetail);

  ngOnInit(): void {
    this.titleService.setTitle('Free Daily Investment Idea')
    this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
    if (this.dailyBlogSplited()[1]) {
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
