import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  isLoading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS: {
      const newUser = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user: newUser, authError: null, isLoading: false };
    }

    case AuthActions.LOG_OUT: {
      return { ...state, user: null };
    }
    case AuthActions.AUTHENTICATE_SUCCESS_START: {
      return { ...state, authError: null, isLoading: true };
    }
    case AuthActions.SIGN_UP_START: {
      return { ...state, authError: null, isLoading: true };
    }
    case AuthActions.AUTHENTICATE_FAIL: {
      return { ...state, authError: action.payload, isLoading: false };
    }
    case AuthActions.CLEAN_ERROR: {
      return { ...state, authError: null };
    }
    default:
      return state;
  }
}
