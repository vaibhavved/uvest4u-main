import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  metaService = inject(Meta);
  titleService = inject(Title);

  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Ensure your investments stay secure with Uvest4U\'s AI technology. Learn about our strict privacy policy and commitment to protect your data.' },
    ]);
    this.titleService.setTitle("Privacy Policy Page | AI & Investing- Uvest4U");
  }
}
