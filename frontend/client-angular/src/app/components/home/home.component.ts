import { OperationService } from '../../shared/services/operation.service';
import { Operation } from '../../shared/models/operation';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accuontNum = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]*$'),
  ]);
  balance: number = 0;

  accuontOperations: Operation[] = [];

  constructor(
    private operationService: OperationService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.accuontNum.hasError('required')) {
      return 'You must enter a value';
    } else if (this.accuontNum.hasError('minLength')) {
      return 'An account number must be exactly 6 digits long';
    } else if (this.accuontNum.hasError('maxLength')) {
      return 'An account number must be exactly 6 digits long';
    } else {
      return 'Account number must contain numbers only';
    }
  }

  calculateBalance() {
    this.accuontOperations.forEach((operation) => {
      operation.type === 'cash withdrawal'
        ? (this.balance -= +operation.amount)
        : (this.balance += +operation.amount);
    });
  }

  formatAmountNumber(amount: number) {
    return formatNumber(amount, this.locale);
  }

  getAccuontDetails() {
    this.operationService.getOperations().subscribe((operationAR) => {
      this.accuontOperations = operationAR.filter(
        (operation) => operation.accountNumber === +this.accuontNum.value
      );
      this.calculateBalance();
    });
  }

  start = new Date(2020, 1, 1);
  end = new Date(2020, 5, 1);

  monthDiff(start: any, payments: any) {
    let months;
    start = new Date(start);
    months = (new Date().getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += new Date().getMonth();
    return payments - months;
  }
}
