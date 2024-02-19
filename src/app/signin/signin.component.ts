import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../app-state.module';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private readonly http: HttpClient, private readonly stateService: AppStateService) { }

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
