import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { CategoryForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { ICategoryForm, ICategory, categoryEditFormValidation } from "../../data/entities";
import { categoryReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const CategoryEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const categoryDetailBranch = useSelector<IAppReduxState, IAsyncData<ICategory>>((state) => state.category.details);
  const editCategoryBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.category.edit);

  useEffect(() => {
    dispatch(categoryReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: ICategoryForm): Promise<void> => {
    await dispatch(categoryReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.category, id));
  };

  return (
    <CategoryForm
      initialData={categoryDetailBranch}
      onSubmit={onSubmit}
      branch={editCategoryBranch}
      validationSchema={categoryEditFormValidation}
      submitTitle="Edit"
    />
  );
};
