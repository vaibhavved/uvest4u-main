import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-join-mailing-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatRadioModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './join-mailing-list.component.html',
  styleUrl: './join-mailing-list.component.scss'
})
export class JoinMailingListComponent {
  private fb = inject(FormBuilder);

  private userService = inject(UserService);

  private cookieService = inject(CookieService);

  public dialog = inject(MatDialog);

  public route = inject(Router);

  /**
   * Contact Form Initialize 
   */
  contactDetail: NonNullable<any>

  /**
   * signal for checking form submition
   */
  public submitted = signal<boolean>(false);

  /**
   * Disable the submit button when api calls and enables when response comes
   */
  public submitDisable = signal<boolean>(false);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.route.url == '/home') {
      this.contactDetail = this.fb.group({
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        daily: [false],
        weekly: [false],
        today: [false],
      });
      this.contactDetail?.get('today').valueChanges.subscribe((todayChecked: AbstractControl) => {
        if (todayChecked) {
          this.contactDetail.get('email').clearValidators();
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('daily').setValue(false);
          this.contactDetail.get('weekly').setValue(false);
        }
      });
      this.contactDetail.get('daily').valueChanges.subscribe((dailyChecked: AbstractControl) => {
        if (dailyChecked) {
          this.contactDetail.get('email').addValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('today').setValue(false);
        }
      });
      this.contactDetail.get('weekly').valueChanges.subscribe((weeklyChecked: AbstractControl) => {
        if (weeklyChecked) {
          this.contactDetail.get('email').addValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('today').setValue(false);
        }
      });
    } else {
      this.contactDetail = this.fb.group({
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        daily: [false],
        weekly: [false],
        investor: [false],
      });
      this.contactDetail?.get('investor').valueChanges.subscribe((todayChecked: AbstractControl) => {
        if (todayChecked) {
          this.contactDetail.get('email').clearValidators();
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('daily').setValue(false);
          this.contactDetail.get('weekly').setValue(false);
        }
      });
      this.contactDetail.get('daily').valueChanges.subscribe((dailyChecked: AbstractControl) => {
        if (dailyChecked) {
          this.contactDetail.get('email').addValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('investor').setValue(false);
        }
      });
      this.contactDetail.get('weekly').valueChanges.subscribe((weeklyChecked: AbstractControl) => {
        if (weeklyChecked) {
          this.contactDetail.get('email').addValidators([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
          this.contactDetail.get('email').updateValueAndValidity();
          this.contactDetail.get('investor').setValue(false);
        }
      });
    }
    
  }

  /**
   * Captures the User Detail
   */
  captureDetails(): void {
    this.submitted.set(true);
    const obj = {
      email: this.contactDetail.value.email,
      DailyUpdates: this.contactDetail.value.daily,
      WeeklyUpdates: this.contactDetail.value.weekly,
      TodayUpdates: this.contactDetail.value.today,
    }
    if (this.contactDetail.valid) {
      this.userService.captureDetails(obj).pipe(tap((res) => {
        if (res) {
          this.dialog.closeAll();
          this.cookieService.set('marketEmail', this.contactDetail.value.email?this.contactDetail.value.email:'No Email', 14);
          this.contactDetail.reset();
          if (this.route.url == '/home') {
            this.route.navigate(['/investment-idea'], { state: { blogDetail: this.data?.blogDetail } })
          } else {
            this.route.navigate(['/waiting-for-ai-response'], { state: { data: this.data?.data } });
          }
        }
      }), catchError((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${err.error}`,
          showConfirmButton: false,
          timer: 1500
        })
        return err
      })).subscribe()
    }
  }
}
