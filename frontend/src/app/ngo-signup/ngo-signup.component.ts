import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-signup',
  templateUrl: './ngo-signup.component.html',
  styleUrls: ['./ngo-signup.component.scss']
})
export class NgoSignupComponent implements OnInit {

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit(): void {
  }

  count = 0;

  increaseCount(){ this.count++ }

  formLoading = false;

  signUpForm = new FormGroup({
    // Define your form controls and their initial values and validators here
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator()]),
  });

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.parent?.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { mismatch: true }
    };
  }


  submitForm() {
    // Process your form here
    this.signUpForm.valid ? console.log(this.signUpForm.value) : console.log('Invalid form');

    if(this.signUpForm.valid){
      this.formLoading = true;
      this.http.post('https://cause-harbour.onrender.com/api/v1/profile', {
        name: this.signUpForm.get('name')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        role: "organization"
      })
      .subscribe({ next: (data) => {
        console.log(data);
        this.formLoading = false;
        this.router.navigate(['signup/ngo/code'], { queryParams: { email: this.signUpForm.get('email')?.value }})
      }, error: (error) => {
        const errorMessage = error.error.message;
        alert(errorMessage);
        this.formLoading = false;
      }});
    }
  }
}
