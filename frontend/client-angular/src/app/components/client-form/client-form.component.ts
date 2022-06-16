import { NotificationService } from '../../shared/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from './../../models/account';
import { AccountService } from '../../shared/services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  title: String = 'Add new client accuont';
  clientId: String = '';
  accuontNum: String = '';
  firstName: String = '';
  lastName: String = '';
  phoneNumber: String = '';
  email: String = '';
  clientAccount: Account | undefined;
  docId: String = '';
  editMode: boolean = false;

  accountForm = this.fb.group({
    tel: [
      '',
      [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{7}'),
        Validators.maxLength(11),
      ],
    ],
    id: [
      '',
      [
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('[0-9]{9}'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    account: [
      '',
      [
        Validators.required,
        Validators.maxLength(6),
        Validators.pattern('[0-9]{6}'),
      ],
    ],
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private accountSer: AccountService,
    private router: Router,
    private notificationSer: NotificationService
  ) {}

  getErrorMessage(key: string) {
    if (this.accountForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.accountForm.get(key)?.errors?.['pattern']) {
      return this.messageForPatternValidation(key);
    }
    if (this.accountForm.get(key)?.errors?.['email']) {
      return 'Enter a valid email address';
    }
    return;
  }

  messageForPatternValidation(key: string): string {
    let message = '';
    switch (key) {
      case 'id':
        message = 'The id number must contain 9 digits and numbers only';
        break;
      case 'account':
        message = 'The account number must contain 6 digits and numbers only';
        break;

      case 'tel':
        message = 'The phone number must be in the format 050-1234567';
        break;
    }
    return message;
  }

  ngOnInit(): void {
    const url = this.router.url;

    if (url.endsWith('edit')) {
      try {
        this.editMode = true;
        this.title = 'Edit Client Account';
        this.accuontNum = window.history.state.account.accountNumber;
        this.firstName = window.history.state.account.firstName;
        this.lastName = window.history.state.account.lastName;
        this.clientId = window.history.state.account.clientID;
        this.email = window.history.state.account.email;
        this.phoneNumber = window.history.state.account.phoneNumber;
        this.docId = window.history.state.account._id;
      } catch (error) {
        this.router.navigate(['/accounts']);
      }
    }
  }

  addAccuont() {
    this.clientAccount = {
      clientID: this.accountForm.value.id,
      firstName: this.accountForm.value.fName,
      lastName: this.accountForm.value.lName,
      accountNumber: this.accountForm.value.account,
      phoneNumber: this.accountForm.value.tel,
      email: this.accountForm.value.email,
    };
    if (this.editMode) {
      this.accountSer
        .updateClient(this.docId, this.clientAccount)
        .subscribe((result) => {
          this.notificationSer.showSnackBar(
            'The client account was successfully update',
            'info-snackbar'
          );
        });
    } else {
      this.accountSer
        .addNewClient(this.clientAccount)
        .subscribe((result) =>
          this.notificationSer.showSnackBar(
            'The client account was successfully created',
            'success-snackbar'
          )
        );
    }
    this.router.navigate(['/accounts']);
  }
}
