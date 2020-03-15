import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { postReduxActions } from "../state/state";
import { IPost } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const PostDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(postReduxActions.getDetail(id));
  }, [dispatch, id]);
  const postDetailBranch = useSelector<IAppReduxState, IAsyncData<IPost>>((state) => state.post.details);

  const deletePost = async (id: string): Promise<void> => {
    await dispatch(postReduxActions.delete(id));
    history.push(ROUTES.post);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable branch={postDetailBranch} route={ROUTES.post} onDelete={deletePost} deleteBranch={deleteBranch}>
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{postDetailBranch.data?.name.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{postDetailBranch.data?.name.en}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
