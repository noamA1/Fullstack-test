import { OperationService } from './../../services/operation.service';
import { Operation } from './../../models/operation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
  accuontNum: Number = 0;
  type: String = '';
  amount: Number = 0;
  payments: Number = 0;
  interest: Number = 0;
  newOperation: Operation | undefined;
  constructor(
    private operationService: OperationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addOperation() {
    this.newOperation = {
      accountNumber: this.accuontNum,
      type: this.type,
      amount: this.amount,
      operationDate: new Date(),
    };

    if (this.type === 'loan') {
      this.newOperation.interest = this.interest;
      this.newOperation.payments = this.payments;
    }

    this.operationService
      .addNewOperation(this.newOperation)
      .subscribe((result) => {
        console.log(result);
        this.router.navigateByUrl('');
      });
  }
}
