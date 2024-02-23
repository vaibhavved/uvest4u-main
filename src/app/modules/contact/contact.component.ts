import { Component, OnInit, inject, signal } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { contactUs } from 'src/app/services/contactus/contactus.interface';
import { Moduletype } from '../enums/moduletype';
import { ContactusService } from 'src/app/services/contactus/contactus.service';
import { catchError, tap } from 'rxjs';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})

export class ContactComponent implements OnInit {
  private contactUsService = inject(ContactusService);

  private userService = inject(UserService);

  private metaService = inject(Meta);

  private titleService = inject(Title);

  /**
   * FormBuilder initialization
   */
  private fb = inject(NonNullableFormBuilder);

  /**
  * Auth token
  */
  private token: string = ''

  /**
   * signal for checking form submition
   */
  public submitted = signal<boolean>(false);

  /**
   * Disable the submit button when api calls and enables when response comes
   */
  public submitDisable = signal<boolean>(false);

  /**
   * Formcontrol and Formgroup initialization
   */
  contactDetail = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^(?:[0-9] ?){6,14}[0-9]$/)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    message: ['', [Validators.required]],
  })



  ngOnInit(): void {
    this.metaService.addTags([
      { name: 'description', content: 'Contact us at Uvest4U to explore AI investment solutions. Unlock your financial potential and shape your successful future today.' },
    ]);
    this.titleService.setTitle("Contact Us | Unlock Your Investment Potential- Uvest4U");

    this.token = localStorage.getItem('core_spa_user_token') || ''

    if (this.token !== null) {
      this.getData();
      this.contactDetail.patchValue({
        email: localStorage.getItem('user_email') || '',
        name: localStorage.getItem('user_userName') || '',
        phone: localStorage.getItem('user_number') || ''
      })
    }
  }

  /**
   * 
   * Sends the contact details of user 
   */
  contact_us(): void {
    this.submitted.set(true);
    this.submitDisable.set(true);
    if (this.contactDetail.invalid) {
      this.submitDisable.set(false);
      return
    }
    const obj: contactUs = {
      "ReturnEmail": this.contactDetail.value.email || '',
      "Message": this.contactDetail.value.message || '',
      "Source": '',
      "name": this.contactDetail.value.name || '',
      "phone": this.contactDetail.value.phone || '',
      "Module": Moduletype.ContactUs
    }
    this.contactUsService.contact_us_form(obj).pipe(tap((res: string) => {
      this.submitted.set(false);
      this.submitDisable.set(false);
      this.contactDetail.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'User details sent Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      // this.route.navigate(['thank-you']);
    }
    ), catchError((err) => {
      this.submitDisable.set(false);
      this.contactDetail.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${err}`,
        showConfirmButton: false,
        timer: 1500
      })
      return err
    })).subscribe()

  }

  /**
   * gets user profile info
   */
  getData(): void {
    this.userService.profileget().subscribe(
      (res: any) => {
        this.contactDetail.patchValue({
          phone: res.phoneNumber
        })
        localStorage.setItem('user_number', res.phoneNumber)
      }
    )
  }
}
