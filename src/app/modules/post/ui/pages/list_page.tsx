import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "../../../../redux/store";
import TableCell from "@material-ui/core/TableCell";
import { ROUTES } from "../../../../routes";
import { IAsyncData } from "../../../../core/models";
import { postReduxActions } from "../state/state";
import { IPost } from "../../data/entities";
import { ListTable } from "../../../../components/list_table";
import { CreateButton } from "../../../../components/create_button";

export const PostListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postReduxActions.getList());
  }, [dispatch]);
  const postListBranch = useSelector<IAppReduxState, IAsyncData<IPost[]>>((state) => state.post.list);

  const deletePost = async (id: string): Promise<void> => {
    await dispatch(postReduxActions.delete(id));
    dispatch(postReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.post.delete);

  return (
    <div>
      <CreateButton route={ROUTES.post} />

      <ListTable<IPost>
        branch={postListBranch}
        route={ROUTES.post}
        onDelete={deletePost}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Position</TableCell>
          </>
        )}
        renderRow={(post) => (
          <>
            <TableCell>{post.name.az}</TableCell>
            <TableCell>{post.name.az}</TableCell>
            <TableCell>{post.name.az}</TableCell>
          </>
        )}
      />
    </div>
  );
};
