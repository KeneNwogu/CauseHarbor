import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing-page/landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { DonorSignupComponent } from './donor-signup/donor-signup.component';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { NgoMissionComponent } from './ngo-mission/ngo-mission.component';
import { NgoSignupSuccessComponent } from './ngo-signup-success/ngo-signup-success.component';


const routes: Routes = [
  // Add your routes here
  { path: '', component: LandingComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signup/donor', component: DonorSignupComponent },
  { path: 'signup/ngo', component: NgoSignupComponent },
  { path: 'ngo/verify', component: NgoMissionComponent },
  { path: 'signup/ngo/success', component: NgoSignupSuccessComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }
