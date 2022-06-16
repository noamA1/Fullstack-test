import { NotificationService } from '../../shared/services/notification.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { OperationService } from '../../shared/services/operation.service';
import { Operation } from './../../models/operation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
  newOperation: Operation | undefined;
  type = new FormControl('', Validators.required);
  dateError: boolean = false;
  // date = new FormControl('', Validators.required);

  constructor(
    private operationService: OperationService,
    private router: Router,
    private fb: FormBuilder,
    private notificationSer: NotificationService
  ) {}

  operationForm = this.fb.group({
    accountNum: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],

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
    // Operation date is required

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
      accountNumber: this.operationForm.value.accountNum,
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
