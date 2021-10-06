import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMsg: string = null;

  constructor(private authSvc: AuthService, private router: Router) {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authSvc.login(email, password);
    } else {
      authObs = this.authSvc.signup(email, password);
    }

    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        this.errorMsg = errorMsg;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}