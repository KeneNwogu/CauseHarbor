import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AppStateService } from './app-state.module';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private router: Router, private stateService: AppStateService) {
    this.stateService.user.subscribe((user: any) => {
      this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let role = route.data['role'] || 'donor';
    
    if (this.user) {
      return this.user.profile?.role === role;
    } else {
      console.log(route.url)
      this.router.navigate(['/signin'], { queryParams: { redirect: '/' + route.url.join('/') } });
      return false;
    }
  }
}