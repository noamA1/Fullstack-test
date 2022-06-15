import { EditProfileComponent } from './components/profile_components/edit-profile/edit-profile.component';
import { AccuontsComponent } from './components/accuonts/accuonts.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { AddUserComponent } from './components/auth/add-user/add-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/profile_components/profile/profile.component';
// canActivate: [SecureInnerPagesGuard]
// canActivate: [SecureInnerPagesGuard]
// canActivate: [SecureInnerPagesGuard]
// canActivate: [SecureInnerPagesGuard]
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'authentication',
    children: [
      { path: 'log-in', component: LoginComponent },
      { path: 'register-user', component: AddUserComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  { path: 'add-operation', component: OperationFormComponent },
  {
    path: 'accounts',
    children: [
      { path: '', component: AccuontsComponent },
      { path: 'add', component: ClientFormComponent },
      { path: 'edit', component: ClientFormComponent },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent },
      { path: 'edit', component: EditProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
