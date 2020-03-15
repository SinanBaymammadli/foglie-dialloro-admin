import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { categoryReduxActions } from "../state/state";
import { ICategory } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const CategoryListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryReduxActions.getList());
  }, [dispatch]);
  const categoryListBranch = useSelector<IAppReduxState, IAsyncData<ICategory[]>>((state) => state.category.list);

  const deleteCategory = async (id: string): Promise<void> => {
    await dispatch(categoryReduxActions.delete(id));
    dispatch(categoryReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.delete);

  return (
    <div>
      <CreateButton route={ROUTES.category} />

      <ListTable<ICategory>
        branch={categoryListBranch}
        route={ROUTES.category}
        onDelete={deleteCategory}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Position</TableCell>
          </>
        )}
        renderRow={(category) => (
          <>
            <TableCell>{category.name.az}</TableCell>
            <TableCell>{category.name.az}</TableCell>
            <TableCell>{category.name.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
