import { combineReducers } from "redux";
import { IAsyncData } from "../../../../core/models";
import { IAsyncReduxAction, asyncItemReducerGenerator } from "../../../../core/redux";
import { ProfileRepoImpl } from "../../data/repo";
import { IPasswordForm } from "../../data/entities";

enum EProfileActionType {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

export interface IProfileReduxState {
  changePassword: IAsyncData<void>;
}

const changePassword = (form: IPasswordForm): IAsyncReduxAction<void> => ({
  type: EProfileActionType.CHANGE_PASSWORD,
  payload: ProfileRepoImpl.changePassword(form),
});
const changePasswordReducer = asyncItemReducerGenerator<void>(EProfileActionType.CHANGE_PASSWORD);

export const profileRedux = {
  actions: {
    changePassword,
  },
  reducers: {
    changePassword: changePasswordReducer,
  },
};

export const ProfileReducers = combineReducers<IProfileReduxState>({
  ...profileRedux.reducers,
});
