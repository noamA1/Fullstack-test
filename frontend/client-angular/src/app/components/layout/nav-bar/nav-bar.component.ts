import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isLogin: boolean = false;
  fullName: string | undefined;
  docId: string = '';
  connectedUser: any;
  userRole: string | undefined;
  displayName: String | undefined;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')?.toString();
    this.isLogin = this.auth.isLoggedIn;
  }

  signOut() {
    this.auth.SignOut();
  }
}
