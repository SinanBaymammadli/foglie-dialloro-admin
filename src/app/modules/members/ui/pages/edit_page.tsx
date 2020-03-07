import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { MemberForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IMemberForm, IMember, memberEditFormValidation } from "../../data/entities";
import { memberReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const MemberEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const memberDetailBranch = useSelector<IAppReduxState, IAsyncData<IMember>>((state) => state.members.details);
  const editMemberBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.members.edit);

  useEffect(() => {
    dispatch(memberReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IMemberForm): Promise<void> => {
    await dispatch(memberReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.members, id));
  };

  return (
    <MemberForm
      initialData={memberDetailBranch}
      onSubmit={onSubmit}
      branch={editMemberBranch}
      validationSchema={memberEditFormValidation}
      submitTitle="Edit"
    />
  );
};
