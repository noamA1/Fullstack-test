import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Account } from 'src/app/shared/models/account';

@Component({
  selector: 'app-accuonts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
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
