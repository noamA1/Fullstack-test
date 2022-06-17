import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private profileSer: ProfileService,
    private router: Router
  ) {}

  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  id: string = '';

  profileForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
  });

  ngOnInit(): void {
    try {
      this.firstName = window.history.state.user.firstName;
      this.lastName = window.history.state.user.lastName;
      this.phone = window.history.state.user.phone;
      this.id = window.history.state.user.id;
    } catch (error) {
      this.router.navigate(['/profile']);
    }
  }

  getErrorMessage(key: string) {
    if (this.profileForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.profileForm.get(key)?.errors?.['pattern']) {
      return 'The phone number must be in the format 050-1234567';
    }
    if (this.profileForm.get(key)?.errors?.['maxLength']) {
      return 'Phone number need to be 10 digits and 1 dash only';
    }
    return;
  }

  update() {
    this.profileSer.updateUserProfile(
      this.id,
      this.firstName,
      this.lastName,
      this.phone
    );
    this.router.navigate(['/profile']);
  }
}
