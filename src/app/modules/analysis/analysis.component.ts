import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { analisysParsed } from 'src/app/services/investor-type/investortype.interface';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  private route = inject(Router)

  /**
   * stores Analysis detail
   */
  public analisysDetail: analisysParsed = JSON.parse(this.route?.getCurrentNavigation()?.extras?.state?.analisys);
}
