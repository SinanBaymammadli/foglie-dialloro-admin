import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { CategoryForm } from "../components/form";
import { IAsyncData } from "../../../../core/models";
import { categoryReduxActions } from "../state/state";
import { ICategoryForm } from "../../data/entities";

export const CategoryCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (values: ICategoryForm): Promise<void> => {
    await dispatch(categoryReduxActions.create(values));
    history.push(ROUTES.category);
  };

  const createCategoryBranch = useSelector<IAppReduxState, IAsyncData<any>>((state) => state.category.create);

  return <CategoryForm branch={createCategoryBranch} onSubmit={onSubmit} initialData={null} submitTitle="Create" />;
};
