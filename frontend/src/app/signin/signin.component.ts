import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../app-state.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private readonly http: HttpClient, 
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly stateService: AppStateService) { }

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  submittingForm = false

  signIn(){
    // Handle sign in here
    if(!this.signInForm.valid) return
    this.submittingForm = true

    this.http.post('https://cause-harbour.onrender.com/api/v1/profile/login', this.signInForm.value)
      .subscribe({
        next: (data: any) => {
          this.submittingForm = false
          this.stateService.user = data;
          if(this.route.snapshot.queryParams['redirect']){
            this.router.navigate([this.route.snapshot.queryParams['redirect']])
          }
          else{
            this.router.navigate(['/'])
          }
        },
        error: (err) => {
          this.submittingForm = false
          alert(err.error.message);
        },
      })

  }

  ngOnInit(): void {
  }

}
