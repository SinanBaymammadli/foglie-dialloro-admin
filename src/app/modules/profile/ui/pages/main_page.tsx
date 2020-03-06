import React from "react";
import { PasswordForm } from "../components/password_form";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { IAsyncData } from "../../../../core/models";
import { IPasswordForm } from "../../data/entities";
import { profileRedux } from "../state/state";
import { useHistory } from "react-router-dom";

interface IProps {}

export const ProfileMainPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IPasswordForm): Promise<void> => {
    await dispatch(profileRedux.actions.changePassword(values));
    history.push("/");
  };

  const passwordChangeBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.profile.changePassword);

  return (
    <PasswordForm branch={passwordChangeBranch} onSubmit={onSubmit} initialData={null} submitTitle="Change password" />
  );
};
