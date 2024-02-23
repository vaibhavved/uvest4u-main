import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-how-works',
  templateUrl: './how-works.component.html',
  styleUrls: ['./how-works.component.scss']
})
export class HowWorksComponent {
  metaService = inject(Meta);
  titleService = inject(Title);
  
  /**
   * Initializes the slider
   */
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false,
    "autoplay": false,
    "autoplaySpeed": 1500,
    "variableWidth": true,
    "arrows": false,
    "speed": 1000,
    responsive: [
      {
        breakpoint: 576, // Apply settings below 576px screen width
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Maximize returns with Uvest4U\'s AI Investment Strategies. Embrace the future of investing with our smart, data-driven solutions. Invest smarter today!' },
    ]);
    this.titleService.setTitle("AI Investment Strategies: Smart Solutions for Modern Investors");
  }

  /**
   * 
   * Sets the margin right for slider container
   */
  slickInit(): void {
    const leftOffset = (($(window).width() || 0) - ($('.container').width() || 0)) / 2;
    $('.slick-list').css('margin-right', `-${leftOffset}px`)
  }
}
