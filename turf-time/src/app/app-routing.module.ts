import { TurfDetailsComponent } from './components/turf-list/turf-details/turf-details.component';
import { TurfDetails } from './components/shared/interface/turfDetails';
import { TurfListComponent } from './components/turf-list/turf-list.component';
import { PartnerAddComponent } from './components/partner-add/partner-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: DashboardComponent },
  { path: 'partnership', component: PartnerAddComponent },
  { path: 'turfs', component: TurfListComponent },
  { path: 'turfdetails', component: TurfDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
