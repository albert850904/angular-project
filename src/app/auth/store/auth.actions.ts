import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[auth] Log In';
export const LOG_OUT = '[auth] Log Out';
export const AUTHENTICATE_SUCCESS_START = '[auth] Log In Start';
export const AUTHENTICATE_FAIL = '[auth] Log In Fail';
export const SIGN_UP_START = '[auth] Signup Start';
export const AUTO_LOG_IN = '[auth] Auto Log In';
export const CLEAN_ERROR = '[auth] Clean Error';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = AUTHENTICATE_SUCCESS_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthLogin implements Action {
  readonly type = AUTO_LOG_IN;
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOG_OUT;
}

export class SignupStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class CleanError implements Action {
  readonly type = CLEAN_ERROR;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | AuthenticateFail
  | LoginStart
  | AuthLogin
  | SignupStart
  | CleanError;
