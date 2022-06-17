import { Router } from '@angular/router';
import { User } from './../../../models/user';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  role: String | undefined;
  docId: string = '';
  userProfile$: any;
  constructor(
    private profileSer: ProfileService,
    private authSer: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.docId = this.authSer.getUser()?.user.uid;
    this.userProfile$ = this.profileSer.getSingleUser(this.docId);
    this.userProfile$.subscribe((info: any) => {
      this.email = info.email;
      this.firstName = info.firstName;
      this.lastName = info.lastName;
      this.phone = info.phoneNumber;
      this.role = info.userRole;
    });
  }

  edit() {
    this.router.navigateByUrl('/profile/edit', {
      state: {
        user: {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          id: this.docId,
        },
      },
    });
  }
}
