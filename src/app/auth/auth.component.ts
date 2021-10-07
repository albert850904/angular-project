import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMsg: string = null;
  storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isLoading;
      this.errorMsg = authState.authError;
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    // let authObs: Observable<AuthResData>;

    // this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authSvc.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    // authObs.subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMsg) => {
    //     this.errorMsg = errorMsg;
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  handleCleanError() {
    this.store.dispatch(new AuthActions.CleanError());
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
