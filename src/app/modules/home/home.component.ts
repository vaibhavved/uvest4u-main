import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, tap } from 'rxjs';
import { blog } from 'src/app/services/blog/blog.interface';
import { BlogService } from 'src/app/services/blog/blog.service';
import { JoinMailingListComponent } from 'src/app/shared/popups/join-mailing-list/join-mailing-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  titleService = inject(Title);
  metaService = inject(Meta);
  blogService = inject(BlogService);
  domSanitizer = inject(DomSanitizer);
  route = inject(Router);
  cookieService = inject(CookieService);
  dialog = inject(MatDialog);

  /**
   * Get Daily Blog observable
   */
  getDailyBlog$ = this.blogService.getDailyBlog().pipe(
    map((res: blog) => {
      if (res) {
        //trim the string to the maximum length
        let trimmedString = res.message.substr(0, 300);

        //re-trim if we are in the middle of a word
        trimmedString = `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...`;

        trimmedString = trimmedString.replace(/\\n/g, '<br />');
        res.message = res.message.replace(/\\n/g, '<br />');
        res.partialContent = this.domSanitizer?.bypassSecurityTrustHtml(trimmedString);
        res.createDate = moment(res.createDate).format('Do MMM YYYY hh:mm A');
      }
      return res;
    }),
    catchError(() => {
      throw new Error('Something went wrong, Please try again or reload the browser');
    })
  );

  ngOnInit(): void {
    this.metaService.addTags([
      {
        name: 'description',
        content:
          "Boost your finances with Uvest4U's AI-Driven Investments. Get smarter with your money and see superior returns. Start investing with us today!"
      }
    ]);
    this.titleService.setTitle('Elevate Your Finances with AI-Driven Investments - Uvest4U');
  }

  /**
   * Passes the daily blog detail to investment idea page if mail is already added
   * otherwise open the mailing popup for enter mail and preferences
   * @param dailyBlog Gives the daily blog detail
   *
   */
  redirectToinvestmentIdea(dailyBlog: blog): void {
    if (this.cookieService.get('marketEmail')) {
      this.route.navigate(['/investment-idea'], { state: { blogDetail: dailyBlog } });
    } else {
      let matDialog = this.dialog.open(JoinMailingListComponent, {
        width: '684px',
        backdropClass: 'modal-backdrop',
        panelClass: ['modal-wrapper', 'modal-md'],
        data: { blogDetail: dailyBlog }
      });
      matDialog.afterClosed().subscribe(res => {
        window.scrollTo(0, 0);
      });
    }
  }
}
