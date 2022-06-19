import { NotificationService } from '../../shared/services/notification.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { OperationService } from '../../shared/services/operation.service';
import { Operation } from '../../shared/models/operation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
  newOperation: Operation | undefined;
  type = new FormControl('', Validators.required);
  accountNum = new FormControl('', Validators.required);
  dateError: boolean = false;
  allAccounts: Account[] = [];

  operationForm = this.fb.group({
    amount: [
      '',
      [
        Validators.required,
        Validators.pattern('^([1-9][0-9]*)$'),
        Validators.min(1),
        Validators.max(999999999),
      ],
    ],
    date: ['', Validators.required],
    payments: [
      '',
      [
        Validators.required,
        Validators.pattern('^([1-9][0-9]*)$'),
        Validators.min(1),
        Validators.max(999),
      ],
    ],
    interest: ['', [Validators.required]],
  });

  constructor(
    private operationService: OperationService,
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountService,
    private notificationSer: NotificationService
  ) {}

  ngOnInit(): void {
    this.type.valueChanges.subscribe((type) => {
      if (!(type === 'loan')) {
        this.operationForm.get('payments')?.disable();
        this.operationForm.get('interest')?.disable();
      } else {
        this.operationForm.get('payments')?.enable();
        this.operationForm.get('interest')?.enable();
      }
    });
    this.accountService.getAll().subscribe((resultArray) => {
      this.allAccounts = resultArray;
    });
  }

  getErrorMessage(key: string) {
    if (this.operationForm.get(key)?.errors?.['required']) {
      return 'You must enter a value';
    }
    if (this.operationForm.get(key)?.errors?.['pattern']) {
      return this.messageForPatternValidation(key);
    }
    if (
      this.operationForm.get(key)?.errors?.['min'] ||
      this.operationForm.get(key)?.errors?.['max']
    ) {
      return `The ${key} number can be between ${
        key.includes('Payments') ? '1 to 999' : '1 to 999999999 '
      } only`;
    }
    return;
  }

  messageForPatternValidation(key: string): string {
    let message = '';
    switch (key) {
      case 'accountNum':
        message = 'The account number must contain 6 digits and numbers only';
        break;
      case 'amount':
        message = 'The amount must contain numbers only';
        break;

      case 'payments':
        if (this.type.value === 'loan') {
          message = 'The payments must contain numbers only ';
        }
        break;
    }
    return message;
  }

  addOperation() {
    this.newOperation = {
      accountNumber: this.accountNum.value,
      type: this.type.value,
      amount: this.operationForm.value.amount,
      operationDate: this.operationForm.value.date,
    };

    if (this.type.value === 'loan') {
      this.newOperation.interest = this.operationForm.value.interest;
      this.newOperation.payments = this.operationForm.value.payments;
    }

    this.operationService
      .addNewOperation(this.newOperation)
      .subscribe((result) => {
        this.notificationSer.showSnackBar(
          'The operation added successfully',
          'success-snackbar'
        );
        this.router.navigateByUrl('');
      });
  }
}
