import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { MaterialModule } from './material/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { AddUserComponent } from './components/auth/add-user/add-user.component';
import { ProfileComponent } from './components/profile_components/profile/profile.component';
import { EditProfileComponent } from './components/profile_components/edit-profile/edit-profile.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ClientFormComponent } from './components/accountsComponents/client-form/client-form.component';
import { AccountsComponent } from './components/accountsComponents/accounts/accounts.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

// firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    OperationFormComponent,
    ClientFormComponent,
    AccountsComponent,
    LoginComponent,
    AddUserComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    EditProfileComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
