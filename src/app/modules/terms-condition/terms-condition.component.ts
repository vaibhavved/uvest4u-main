import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent {
  metaService = inject(Meta);
  titleService = inject(Title);
  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Ensure your investments stay secure with Uvest4U\'s AI technology. Learn about our strict privacy policy and commitment to protect your data.' },
    ]);
    this.titleService.setTitle("Terms Of Use | AI & Investing- Uvest4U");
  }
}
