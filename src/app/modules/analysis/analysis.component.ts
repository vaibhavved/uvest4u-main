import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { analisysParsed } from 'src/app/services/investor-type/investortype.interface';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  private route = inject(Router);
  private titleService = inject(Title);
  /**
   *
   * stores Analysis detail
   */
  public analisysDetail = signal<analisysParsed>(
    JSON.parse(this.route?.getCurrentNavigation()?.extras?.state?.analisys)
  );

  ngOnInit():void{
    this.titleService.setTitle('Analysis')
  }
}
