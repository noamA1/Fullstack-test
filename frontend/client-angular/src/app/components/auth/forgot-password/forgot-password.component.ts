import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthService) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter your email address';
    }
    if (this.emailFormControl.hasError('email')) {
      return 'Enter a vaild email address';
    }
    return;
  }
  resetPassword() {
    this.authService.ForgotPassword(this.emailFormControl.value);
  }
}
