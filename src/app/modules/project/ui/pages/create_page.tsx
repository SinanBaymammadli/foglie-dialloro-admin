import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { ProjectForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { projectReduxActions } from "../state/state";
import { IProjectForm } from "../../data/entities";

export const ProjectCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: IProjectForm): Promise<void> => {
    await dispatch(projectReduxActions.create(values));
    history.push(ROUTES.project);
  };

  const createProjectBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.project.create);

  return <ProjectForm branch={createProjectBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
