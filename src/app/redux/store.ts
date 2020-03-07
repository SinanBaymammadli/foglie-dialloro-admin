import thunk, { ThunkDispatch } from "redux-thunk";
import { createStore, applyMiddleware, combineReducers, Reducer, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reduxPromiseMiddleware, confirmationMiddleware } from "./middlewares";
import { IAuthenticationReduxState, AuthenticationReducers } from "../modules/auth/ui/state/state";
import { UserReducers, IUserReduxState } from "../modules/user/ui/state/state";
import { IProfileReduxState, ProfileReducers } from "../modules/profile/ui/state/state";
import { IMemberReduxState, MemberReducers } from "../modules/members/ui/state/state";

export interface IAppReduxState {
  auth: IAuthenticationReduxState;
  user: IUserReduxState;
  profile: IProfileReduxState;
  members: IMemberReduxState;
}

export function getRootReducer(): Reducer<IAppReduxState> {
  const reducersList = {
    auth: AuthenticationReducers,
    user: UserReducers,
    profile: ProfileReducers,
    members: MemberReducers,
  };

  return combineReducers<IAppReduxState>(reducersList);
}

export const store = createStore(
  getRootReducer(),
  composeWithDevTools(applyMiddleware(thunk, reduxPromiseMiddleware, confirmationMiddleware)),
);

export type ReduxDispatch = ThunkDispatch<IAppReduxState, any, Action>;
