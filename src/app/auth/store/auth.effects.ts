import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { environment } from 'src/environments/environment';

export interface AuthResData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  localId: string,
  idToken: string,
  expiresIn: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const newUser = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(newUser));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate,
    redirect: true,
  });
};

const handleError = (error: any) => {
  let errorMsg = 'unknown error';
  if (!error.error || !error.error.error)
    return of(new AuthActions.AuthenticateFail(errorMsg));
  switch (error.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This Email Existed Already!!!';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'This Email Does not Exist';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'Password incorrect';
      break;
    default:
      errorMsg = 'An error occurred';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService
  ) {}
  @Effect()
  authLogin = this.actions$.pipe(
    // filtering
    ofType(AuthActions.AUTHENTICATE_SUCCESS_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((res) => {
            this.authSvc.setLogout(+res.expiresIn * 1000);
          }),
          map((res) => {
            return handleAuthentication(
              res.email,
              res.localId,
              res.idToken,
              res.expiresIn
            );
          }),
          catchError((error) => {
            return handleError(error);
          })
        );
    })
  );

  // 不dispatch 任何action 的Effect
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authAction: AuthActions.AuthenticateSuccess) => {
      if (authAction.payload.redirect) this.router.navigate(['/']);
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signupActions: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: signupActions.payload.email,
            password: signupActions.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((res) => {
            this.authSvc.setLogout(+res.expiresIn * 1000);
          }),
          map((res) => {
            return handleAuthentication(
              res.email,
              res.localId,
              res.idToken,
              res.expiresIn
            );
          }),
          catchError((error) => {
            return handleError(error);
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOG_IN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) return { type: 'Dummy' };
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (!loadedUser.token) return { type: 'Dummy' };
      // this.user.next(loadedUser);

      const duration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.authSvc.setLogout(duration);

      return new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
        redirect: false,
      });

      //  this.authLogout(duration);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOG_OUT),
    tap(() => {
      this.authSvc.clearTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
}
