import { Router } from '@angular/router';
import { Account } from './../../models/account';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  clientAccount: Account | undefined;
  docId: String = '';
  editMode: boolean = false;

  accountForm = this.fb.group({
    tel: [''],
    id: [''],
    account: [''],
    fName: [''],
    lName: [''],
  });

  constructor(
    private fb: FormBuilder,
    private accountSer: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    console.log(window.history.state.account.clientID);
    if (url.endsWith('edit')) {
      this.editMode = true;
      this.title = 'Edit Client Account';
      this.accuontNum = window.history.state.account.accountNumber;
      this.firstName = window.history.state.account.firstName;
      this.lastName = window.history.state.account.lastName;
      this.clientId = window.history.state.account.clientID;
      this.phoneNumber = window.history.state.account.phoneNumber;
      this.docId = window.history.state.account._id;
    }
  }

  addAccuont() {
    this.clientAccount = {
      clientID: this.accountForm.value.id,
      firstName: this.accountForm.value.fName,
      lastName: this.accountForm.value.lName,
      accountNumber: this.accountForm.value.account,
      phoneNumber: this.accountForm.value.tel,
    };
    if (this.editMode) {
      this.accountSer
        .updateClient(this.docId, this.clientAccount)
        .subscribe((result) => {
          console.log(result);
        });
    } else {
      this.accountSer
        .addNewClient(this.clientAccount)
        .subscribe((result) => console.log(result));
    }
    // console.log(this.accountForm.value);
    // console.log(typeof this.accountForm.value.accuont);
  }
}
