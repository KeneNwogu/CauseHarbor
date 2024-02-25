import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app-state.module';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  user: any;
  constructor(private readonly http: HttpClient, 
    private readonly stateService: AppStateService, private readonly router: Router) { 
    this.stateService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  campaignImage: any;
  onImageChange(event: any){
    this.campaignImage = event.target.files[0];
  }

  createCampaignForm: any = new FormGroup({
    goals: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    targetBudget: new FormControl('', Validators.required),
  });

  submittingForm = false

  createCampaign(){
    // Handle campaign creation here
    if(!this.createCampaignForm.valid) return
    this.submittingForm = true

    // Send form data to the server
    let form = new FormData()
    Object.keys(this.createCampaignForm.value).forEach((key) => {
      if(key == "goals"){
        this.createCampaignForm.value.goals.forEach((goal: string) => form.append('goals', goal))
      }
      else form.append(key, this.createCampaignForm.value[key])
    })

    form.append('campaignImage', this.campaignImage)
    this.http.post('https://cause-harbour.onrender.com/api/v1/campaigns', form, {
      headers: {
        'Authorization': 'Bearer ' + this.user.token
      }
    })
    .subscribe({
      next: (data: any) => {
        this.submittingForm = false
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.submittingForm = false
        alert(err.error.message);
      },
    })
  }

  ngOnInit(): void {
  }

  goals: string[] = [
    'Zero hunger',
    'Good health and well being',
    'Quality education',
    'Gender equality',
    'Clean water and sanitation',
    'Affordable and clean energy',
    'Decent work and Economic growth',
    'Industry, Innovation and infrastructure',
    'Reduced inequality',
    'Sustainable cities and communities',
    'Climate action',
    'Responsible consumption and communities',
    'Life below water',
    'Life on land',
    'Peace, justice and strong institutions',
    'Partnership for the goals'
  ];
}
