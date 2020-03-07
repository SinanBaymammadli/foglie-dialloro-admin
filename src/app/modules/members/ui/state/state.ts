import { combineReducers } from "redux";
import {
  ICRUDReduxState,
  generateCrudReducers,
  generateCrudActionTypes,
  ICRUDActionTypes,
  ICrudReduxActionCreators,
  generateCrudReduxActionCreators,
} from "../../../../core/redux";
import { IMember, IMemberForm } from "../../data/entities";
import { MemberRepoImpl } from "../../data/repo";

const moduleName = "Member";

interface IMemberActionTypes extends ICRUDActionTypes {}

const actionTypes: IMemberActionTypes = {
  ...generateCrudActionTypes(moduleName),
};

interface IMemberActionCreators extends ICrudReduxActionCreators<IMember, IMemberForm> {}

export const memberReduxActions: IMemberActionCreators = {
  ...generateCrudReduxActionCreators<IMember, IMemberForm>({ actionTypes, repository: MemberRepoImpl }),
};

export interface IMemberReduxState extends ICRUDReduxState<IMember> {}

export const MemberReducers = combineReducers<IMemberReduxState>({
  ...generateCrudReducers<IMember>(actionTypes),
});
