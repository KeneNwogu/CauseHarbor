import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app-state.module';

@Component({
  selector: 'app-donor-landing',
  templateUrl: './donor-landing.component.html',
  styleUrls: ['./donor-landing.component.scss']
})
export class DonorLandingComponent implements OnInit {
  user: any;
  campaignList: any[] = []
  loadingCampaigns = true 

  constructor(private readonly stateService: AppStateService, 
    private readonly router: Router, private readonly http: HttpClient) { 
    this.stateService.user.subscribe((user: any) => {
      this.user = user;
    });

    this.user.firstName = this.user.profile.name.split(' ')[0];
    this.http.get('https://cause-harbour.onrender.com/api/v1/campaigns')
    .subscribe({
      next: (data: any) => {
        this.campaignList = data.campaigns
        this.loadingCampaigns = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
