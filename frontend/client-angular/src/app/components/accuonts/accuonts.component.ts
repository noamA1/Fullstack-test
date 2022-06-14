import { Router } from '@angular/router';
import { Account } from './../../models/account';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accuonts',
  templateUrl: './accuonts.component.html',
  styleUrls: ['./accuonts.component.css'],
})
export class AccuontsComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  dataSource: Account[] = [];
  displayedColumns: string[] = [
    'Client ID',
    'Account number',
    'Full name',
    'Phone number',
    'delete',
    'edit',
  ];
  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountService.getAll().subscribe((resultArray) => {
      this.dataSource = resultArray;
    });
  }

  delAccount(id: String) {
    this.accountService.deleteClient(id).subscribe((result) => {
      console.log(result);
      this.getAllAccounts();
    });
  }

  editAccount(accountToEdit: Account) {
    this.router.navigateByUrl('accounts/edit', {
      state: { account: accountToEdit },
    });
  }
}
