import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

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

  constructor(
    public auth: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.isLogin = this.auth.isLoggedIn;
    if (this.isLogin) {
      this.docId = this.auth.getUser().uid;
      this.connectedUser = this.profileService.getSingleUser(this.docId);
      this.connectedUser.subscribe((info: any) => {
        this.fullName = `${info.firstName} ${info.lastName}`;
      });
    }
  }

  signOut() {
    this.auth.SignOut();
  }
}
