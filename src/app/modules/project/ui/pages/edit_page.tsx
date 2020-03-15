import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { ProjectForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IProjectForm, IProject, projectEditFormValidation } from "../../data/entities";
import { projectReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const ProjectEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const projectDetailBranch = useSelector<IAppReduxState, IAsyncData<IProject>>((state) => state.project.details);
  const editProjectBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.project.edit);

  useEffect(() => {
    dispatch(projectReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IProjectForm): Promise<void> => {
    await dispatch(projectReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.project, id));
  };

  return (
    <ProjectForm
      initialData={projectDetailBranch}
      onSubmit={onSubmit}
      branch={editProjectBranch}
      validationSchema={projectEditFormValidation}
      submitTitle="Edit"
    />
  );
};
