import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  loadingCampaign = true 
  showPaymentPopup = false
  campaign: any = null

  displayPaymentPopup(){
    this.showPaymentPopup = true
  }

  closePaymentPopup(){
    this.showPaymentPopup = false
  }

  constructor(private readonly http: HttpClient, private readonly route: ActivatedRoute) { 
    let campaignId = route.snapshot.params['campaignId']
    this.http.get(`https://cause-harbour.onrender.com/api/v1/campaigns/${campaignId}`)
    .subscribe({
      next: (data: any) => {
        this.campaign = data.campaign;
        this.loadingCampaign = false;
      },
      error: (err: any) => {
        this.loadingCampaign = false;
      }
    })
  }

  ngOnInit(): void {
  }

}
