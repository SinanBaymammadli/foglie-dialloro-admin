import { Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { DetailTable } from "../../../../components/detail_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IProject } from "../../data/entities";
import { projectReduxActions } from "../state/state";

export const ProjectDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(projectReduxActions.getDetail(id));
  }, [dispatch, id]);
  const projectDetailBranch = useSelector<IAppReduxState, IAsyncData<IProject>>((state) => state.project.details);

  const deleteProject = async (id: string): Promise<void> => {
    await dispatch(projectReduxActions.delete(id));
    history.push(ROUTES.project);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={projectDetailBranch}
          route={ROUTES.project}
          onDelete={deleteProject}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{projectDetailBranch.data?.title.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>{projectDetailBranch.data?.client.en}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
