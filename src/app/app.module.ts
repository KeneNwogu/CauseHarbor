import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing-page/header/header.component';
import { LandingComponent } from './landing-page/landing/landing.component';
import { CtaDivComponent } from './landing-page/cta-div/cta-div.component';
import { HowDivComponent } from './landing-page/how-div/how-div.component';
import { WhyDivComponent } from './landing-page/why-div/why-div.component';
import { WhySubdivComponent } from './landing-page/why-subdiv/why-subdiv.component';
import { CausesComponent } from './landing-page/causes/causes.component';
import { FaqComponent } from './landing-page/faq/faq.component';
import { FooterComponent } from './landing-page/footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { DonorSignupComponent } from './donor-signup/donor-signup.component';
import { NgoSignupComponent } from './ngo-signup/ngo-signup.component';
import { NgoMissionComponent } from './ngo-mission/ngo-mission.component';
import { NgoSignupSuccessComponent } from './ngo-signup-success/ngo-signup-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DonorLandingComponent } from './dashboard/donor/donor-landing/donor-landing.component';
import { NgoSignupVerifyComponent } from './ngo-signup-verify/ngo-signup-verify.component';
import { CreateCampaignComponent } from './dashboard/ngo/create-campaign/create-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    CtaDivComponent,
    HowDivComponent,
    WhyDivComponent,
    WhySubdivComponent,
    CausesComponent,
    FaqComponent,
    SignUpComponent,
    SigninComponent,
    DonorSignupComponent,
    NgoSignupComponent,
    NgoMissionComponent,
    NgoSignupSuccessComponent,
    DonorLandingComponent,
    NgoSignupVerifyComponent,
    CreateCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
