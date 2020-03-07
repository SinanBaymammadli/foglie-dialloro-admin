import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { MemberForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { memberReduxActions } from "../state/state";
import { IMemberForm } from "../../data/entities";

export const MemberCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IMemberForm): Promise<void> => {
    await dispatch(memberReduxActions.create(values));
    history.push(ROUTES.members);
  };

  const createMemberBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.members.create);

  return <MemberForm branch={createMemberBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
