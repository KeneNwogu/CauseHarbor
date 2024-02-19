import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ngo-signup-verify',
  templateUrl: './ngo-signup-verify.component.html',
  styleUrls: ['./ngo-signup-verify.component.scss']
})
export class NgoSignupVerifyComponent implements OnInit {

  constructor(private readonly http: HttpClient, 
    private readonly router: Router,
    private readonly route: ActivatedRoute) { 
    
  }

  currentCode = ""
  submittingForm = false

  ngOnInit(): void {
  }

  updateVerificationCode(index: number, event: Event){
    let value = (event.currentTarget as HTMLInputElement).value
    this.currentCode += value.toUpperCase()

    const nextInput = document.querySelector(`.div-19:nth-child(${this.currentCode.length + 1}) input`);
    if (nextInput) {
      (nextInput as HTMLInputElement).disabled = false;
      (nextInput as HTMLInputElement).focus();
    }

    if(this.currentCode.length === 6){
      let email = this.route.snapshot.queryParamMap.get('email')
      this.submittingForm = true;
      this.http.post('https://cause-harbour.onrender.com/api/v1/profile/verify', {
        verificationCode: this.currentCode,
        email
      }).subscribe({
        next: (data: any) => {
          console.log(data)
          this.submittingForm = false
          let token = data.token
          this.router.navigate(['ngo/verify'], { queryParams: { email, registrationToken: token }})
        },
        error: (err) => {
          this.submittingForm = false
          alert(err.error.message);
        },
      })
    }
  }

  clearVerificationCode(){
    let code = this.currentCode.split('')
    this.currentCode = code.slice(0, code.length - 1).join('')
    const nextInput = document.querySelector(`.div-19:nth-child(${this.currentCode.length + 1}) input`);
    if (nextInput) {
      (nextInput as HTMLInputElement).focus();
    }
  }
}
