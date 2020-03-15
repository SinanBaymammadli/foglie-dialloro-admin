import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import { useRouteMatch, useHistory } from "react-router-dom";
import { PostForm } from "../components/form";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { IPostForm, IPost, postEditFormValidation } from "../../data/entities";
import { postReduxActions } from "../state/state";
import { Routing } from "../../../../core/routing";

export const PostEditPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>();
  const id = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const postDetailBranch = useSelector<IAppReduxState, IAsyncData<IPost>>((state) => state.post.details);
  const editPostBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.edit);

  useEffect(() => {
    dispatch(postReduxActions.getDetail(id));
  }, [dispatch, id]);

  const onSubmit = async (form: IPostForm): Promise<void> => {
    await dispatch(postReduxActions.edit(id, form));
    history.push(Routing.generateDetailRoute(ROUTES.post, id));
  };

  return (
    <PostForm
      initialData={postDetailBranch}
      onSubmit={onSubmit}
      branch={editPostBranch}
      validationSchema={postEditFormValidation}
      submitTitle="Edit"
    />
  );
};
