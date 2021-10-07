import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private logoutTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  // 以下都透過ngrx來處理了

  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh_s1Uwref8-qFnzZsk-gwK1rNt_uEPAo',
  //       {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((res) =>
  //         this.handleAuthentication(
  //           res.email,
  //           res.localId,
  //           res.idToken,
  //           +res.expiresIn
  //         )
  //       )
  //     );
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh_s1Uwref8-qFnzZsk-gwK1rNt_uEPAo',
  //       { email, password, returnSecureToken: true }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((res) =>
  //         this.handleAuthentication(
  //           res.email,
  //           res.localId,
  //           res.idToken,
  //           +res.expiresIn
  //         )
  //       )
  //     );
  // }

  // persistLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) return;
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (!loadedUser.token) return;
  //   // this.user.next(loadedUser);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email: loadedUser.email,
  //       userId: loadedUser.id,
  //       token: loadedUser.token,
  //       expirationDate: new Date(userData._tokenExpirationDate),
  //     })
  //   );
  //   const duration =
  //     new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  //   this.authLogout(duration);
  // }

  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.logoutTimer) {
  //     clearTimeout(this.logoutTimer);
  //   }
  //   this.logoutTimer = null;
  // }

  setLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearTimer() {
    if (!this.logoutTimer) return;
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }

  // private handleAuthentication(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  //   const newUser = new User(email, userId, token, expirationDate);
  //   // this.user.next(newUser);
  //   this.store.dispatch(
  //     new AuthActions.AuthenticateSuccess({
  //       email,
  //       userId,
  //       token,
  //       expirationDate,
  //     })
  //   );
  //   this.authLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(newUser));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMsg = 'unknown error';
  //   if (!errorRes.error || !errorRes.error.error) return throwError(errorMsg);
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMsg = 'This Email Existed Already!!!';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMsg = 'This Email Does not Exist';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMsg = 'Password incorrect';
  //       break;
  //     default:
  //       errorMsg = 'An error occurred';
  //       break;
  //   }
  //   return throwError(errorMsg);
  // }
}
