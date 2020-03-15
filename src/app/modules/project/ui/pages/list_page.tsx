import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { projectReduxActions } from "../state/state";
import { IProject } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const ProjectListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectReduxActions.getList());
  }, [dispatch]);
  const projectListBranch = useSelector<IAppReduxState, IAsyncData<IProject[]>>((state) => state.project.list);

  const deleteProject = async (id: string): Promise<void> => {
    await dispatch(projectReduxActions.delete(id));
    dispatch(projectReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.delete);

  return (
    <div>
      <CreateButton route={ROUTES.project} />

      <ListTable<IProject>
        branch={projectListBranch}
        route={ROUTES.project}
        onDelete={deleteProject}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Position</TableCell>
          </>
        )}
        renderRow={(project) => (
          <>
            <TableCell>{project.name.az}</TableCell>
            <TableCell>{project.name.az}</TableCell>
            <TableCell>{project.name.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
