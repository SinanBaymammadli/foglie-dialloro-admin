import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { IAsyncData } from "../../../../core/models";
import { categoryReduxActions } from "../state/state";
import { ICategory } from "../../data/entities";
import { DetailTable } from "../../../../components/detail_table";
import { ROUTES } from "../../../../routes";
import { Table, TableBody, TableRow, TableCell, Grid } from "@material-ui/core";

export const CategoryDetailPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const { id } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(categoryReduxActions.getDetail(id));
  }, [dispatch, id]);
  const categoryDetailBranch = useSelector<IAppReduxState, IAsyncData<ICategory>>((state) => state.category.details);

  const deleteCategory = async (id: string): Promise<void> => {
    await dispatch(categoryReduxActions.delete(id));
    history.push(ROUTES.category);
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.delete);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <DetailTable
          branch={categoryDetailBranch}
          route={ROUTES.category}
          onDelete={deleteCategory}
          deleteBranch={deleteBranch}
        >
          <Table size="medium" className="detail-table">
            <TableBody>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell>{categoryDetailBranch.data?.name.az}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{categoryDetailBranch.data?.name.en}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DetailTable>
      </Grid>
    </Grid>
  );
};
