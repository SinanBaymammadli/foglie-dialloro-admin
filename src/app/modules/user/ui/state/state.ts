import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { IUser, IUserForm } from "../../data/entities";
import { UserRepoImpl } from "../../data/repo";

const moduleName = "User";

interface IUserActionTypes extends ICRUDActionTypes {}

const actionTypes: IUserActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IUserActionCreators extends ICrudReduxActionCreators<IUser, IUserForm> {}

export const userReduxActions: IUserActionCreators = {
  ...generateCrudReduxActionCreators<IUser, IUserForm>({ actionTypes, repository: UserRepoImpl }),
};

export interface IUserReduxState extends ICRUDReduxState<IUser> {}

export const UserReducers = combineReducers<IUserReduxState>({
  ...generateCrudReducers<IUser>(actionTypes),
});
