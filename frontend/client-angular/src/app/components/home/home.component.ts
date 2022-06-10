import { OperationService } from './../../services/operation.service';
import { Operation } from './../../models/operation';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

    // Validators.compose.arguments(Number),
  ]);

  accuontOperations: Operation[] = [];

  constructor(private operationService: OperationService) {}

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

  getAccuontDetails() {
    let tempArray: Operation[] = [];
    console.log(this.accuontNum);
    this.operationService.getOperations().subscribe((operationAR) => {
      this.accuontOperations = operationAR.filter(
        (operation) => operation.accountNumber === +this.accuontNum.value
      );
    });
  }
  ngOnInit(): void {}
}
