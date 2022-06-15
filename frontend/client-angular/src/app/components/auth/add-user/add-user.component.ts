import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  hide = true;
  roles = ['manager', 'employee'];
  role: string | undefined;
  roleError = false;

  registerForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    role: [null, [Validators.required]],
  });

  ngOnInit(): void {}

  getErrorMessage(key: string) {
    if (this.registerForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.registerForm.get(key)?.errors?.['pattern']) {
      return 'The phone number must be in the format 050-1234567';
    }
    if (this.registerForm.get(key)?.errors?.['minLength']) {
      return 'Password must contain at least 6 characters';
    }
    if (this.registerForm.get(key)?.errors?.['maxLength']) {
      return 'Phone number need to be 10 digits and 1 dash only';
    }

    return;
  }

  add() {
    if (this.registerForm.value.role === null) {
      this.roleError = true;
      return;
    } else {
      this.roleError = false;
    }
    this.authService.SignUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.fName,
      this.registerForm.value.lName,
      this.registerForm.value.role
    );
  }
}
