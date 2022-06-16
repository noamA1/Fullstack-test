import { NotificationService } from '../../shared/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from './../../models/account';
import { AccountService } from '../../shared/services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accuonts',
  templateUrl: './accuonts.component.html',
  styleUrls: ['./accuonts.component.css'],
})
export class AccuontsComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private notificationSer: NotificationService
  ) {}

  dataSource: Account[] = [];
  displayedColumns: string[] = [
    'Client ID',
    'Account number',
    'Full name',
    'Phone number',
    'Email',
    'delete',
    'edit',
  ];
  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountService.getAll().subscribe((resultArray) => {
      this.dataSource = resultArray;
      console.log(this.dataSource);
    });
  }

  delAccount(id: String) {
    this.accountService.deleteClient(id).subscribe((result) => {
      this.notificationSer.showSnackBar(
        'Client account was deleted successfully',
        'danger-snackbar'
      );
      this.getAllAccounts();
    });
  }

  editAccount(accountToEdit: Account) {
    this.router.navigateByUrl('accounts/edit', {
      state: { account: accountToEdit },
    });
  }
}
