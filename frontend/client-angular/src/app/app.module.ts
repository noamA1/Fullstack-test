import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from './material/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { AccuontsComponent } from './components/accuonts/accuonts.component';
import { CardComponent } from './components/card/card.component';
// firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { AddUserComponent } from './components/auth/add-user/add-user.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AccountDetailsComponent,
    OperationFormComponent,
    ClientFormComponent,
    AccuontsComponent,
    CardComponent,
    LoginComponent,
    AddUserComponent,
    ForgotPasswordComponent,
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
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
