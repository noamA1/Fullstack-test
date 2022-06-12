import { AccuontsComponent } from './components/accuonts/accuonts.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationFormComponent } from './components/operation-form/operation-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-operation', component: OperationFormComponent },
  {
    path: 'accounts',
    children: [
      { path: '', component: AccuontsComponent },
      { path: 'add', component: ClientFormComponent },
      { path: 'edit', component: ClientFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
