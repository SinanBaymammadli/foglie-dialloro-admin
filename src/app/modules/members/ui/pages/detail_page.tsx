import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { memberReduxActions } from "../state/state";
import { IMember } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const MemberDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(memberReduxActions.getDetail(id));
  }, [dispatch, id]);
  const memberDetailBranch = useSelector<IAppReduxState, IAsyncData<IMember>>((state) => state.members.details);

  const deleteMember = async (id: string): Promise<void> => {
    await dispatch(memberReduxActions.delete(id));
    history.push(ROUTES.members);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.members.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={memberDetailBranch}
          route={ROUTES.members}
          onDelete={deleteMember}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{memberDetailBranch.data?.firstName.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{memberDetailBranch.data?.lastName.az}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
