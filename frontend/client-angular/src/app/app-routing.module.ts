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
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'authentication',
    children: [
      { path: 'log-in', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard, SecureInnerPagesGuard],
  },
  {
    path: 'add-operation',
    component: OperationFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts',
    children: [
      { path: '', component: AccuontsComponent, canActivate: [AuthGuard] },
      { path: 'add', component: ClientFormComponent, canActivate: [AuthGuard] },
      {
        path: 'edit',
        component: ClientFormComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'profile',
    children: [
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
      {
        path: 'edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
