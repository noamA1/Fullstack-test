import { OperationService } from '../../shared/services/operation.service';
import { Operation } from '../../shared/models/operation';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { AccountService } from 'src/app/shared/services/account.service';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allAccounts: Account[] = [];
  accountNum = new FormControl('', Validators.required);
  balance: number = 0;
  isEmptyArray: boolean | undefined;

  accuontOperations: Operation[] = [];

  constructor(
    private operationService: OperationService,
    private accountService: AccountService,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  ngOnInit(): void {
    this.accountService.getAll().subscribe((resultArray) => {
      this.allAccounts = resultArray;
    });
  }

  getErrorMessage() {
    if (this.accountNum.hasError('required')) {
      return 'You must enter a value';
    }
    return;
  }

  calculateBalance() {
    this.balance = 0;
    this.accuontOperations.forEach((operation) => {
      operation.type === 'cash withdrawal'
        ? (this.balance -= +operation.amount)
        : (this.balance += +operation.amount);
    });
  }

  formatAmountNumber(amount: number) {
    return formatNumber(amount, this.locale);
  }

  getAccuontOperations() {
    this.operationService.getOperations().subscribe((operationAR) => {
      this.accuontOperations = operationAR.filter(
        (operation) => operation.accountNumber === +this.accountNum.value
      );
      if (this.accuontOperations.length === 0) {
        this.isEmptyArray = true;
        return;
      } else {
        this.isEmptyArray = false;
        this.calculateBalance();
      }
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
