import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStateService } from '../app-state.module';

@Component({
  selector: 'app-ngo-mission',
  templateUrl: './ngo-mission.component.html',
  styleUrls: ['./ngo-mission.component.scss']
})
export class NgoMissionComponent implements OnInit {

  constructor(private readonly http: HttpClient, private readonly router: Router,
    private readonly route: ActivatedRoute, private readonly stateService: AppStateService) { }

  currentPage = 1
  submittingForm = false

  formDescriptions = [
    'Fill in your details',
    'What SGDs does your NGO want to help with and make the world a better place'
  ]
  
  completeSignupForm = new FormGroup({
    // Define your form controls and their initial values and validators here
    missionStatement: new FormControl('', Validators.required),
    // organizationLogo: new FormControl('', Validators.required)
  });

  organizationLogo: File | null = null

  uploadOrganizationLogo(event: any){
    this.organizationLogo = event.target.files[0]
  }

  selectedOrganizationGoals: string[] = []

  goals: string[] = [
    'no poverty',
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

  updateOrganizationGoals(goal: string){
    if(this.selectedOrganizationGoals.includes(goal)){
      this.selectedOrganizationGoals = this.selectedOrganizationGoals.filter(g => g != goal)
      return
    }

    if(this.selectedOrganizationGoals.length >= 5) return

    this.selectedOrganizationGoals.push(goal)
  }

  completeSignup(){
    this.submittingForm = true
    let form = new FormData()
    form.set('missionStatement', this.completeSignupForm.controls.missionStatement.value!)
    form.append('logo', this.organizationLogo!)
    this.selectedOrganizationGoals.forEach(goal => form.append('organizationGoals', goal))

    this.http.post('https://cause-harbour.onrender.com/api/v1/organizations', form, {
      headers: { Authorization: `Bearer ${this.route.snapshot.queryParamMap.get('registrationToken')}`}
    }).subscribe({
      next: (data: any) => {
        this.submittingForm = false
        this.stateService.user = data;
        this.router.navigate(['/signup/ngo/success'])
      },
      error: (err) => {
        this.submittingForm = false
        alert('An error occurred while trying to complete your registration')
      }
    })
  }

  ngOnInit(): void {
  }

  incrementPage(){ this.currentPage++ }
}
