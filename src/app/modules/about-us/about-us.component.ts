import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  metaService = inject(Meta);
  titleService = inject(Title);

  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Meet our team at Uvest4U, your trusted experts in finance and technology. Learn more about our experience and dedication to your financial success!' },
    ]);
    this.titleService.setTitle("About Us | Finance & Technology Experts - Uvest4U");
  }
}
