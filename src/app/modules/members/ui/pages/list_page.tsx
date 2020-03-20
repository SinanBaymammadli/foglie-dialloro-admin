import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IMember } from "../../data/entities";
import { memberReduxActions } from "../state/state";

export const MemberListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memberReduxActions.getList());
  }, [dispatch]);
  const memberListBranch = useSelector<IAppReduxState, IAsyncData<IMember[]>>((state) => state.members.list);

  const deleteMember = async (id: string): Promise<void> => {
    await dispatch(memberReduxActions.delete(id));
    dispatch(memberReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.members.delete);

  return (
    <div>
      <CreateButton route={ROUTES.members} />

      <ListTable<IMember>
        branch={memberListBranch}
        route={ROUTES.members}
        onDelete={deleteMember}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Position</TableCell>
          </>
        )}
        renderRow={(member) => (
          <>
            <TableCell>{member.firstName.az}</TableCell>
            <TableCell>{member.lastName.az}</TableCell>
            <TableCell>{member.position.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
