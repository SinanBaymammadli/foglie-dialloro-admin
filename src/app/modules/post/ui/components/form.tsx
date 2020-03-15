import React, { useEffect } from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps, IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { postFormValidation, IPostForm, IPost } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { SelectInput } from "../../../../components/select_input";
import { useDispatch, useSelector } from "react-redux";
import { postReduxActions } from "../state/state";
import { IAppReduxState } from "../../../../redux/store";

interface IProps extends IFormProps<IPostForm> {}

export const PostForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postReduxActions.getList());
  }, [dispatch]);
  const postListBranch = useSelector<IAppReduxState, IAsyncData<IPost[]>>((state) => state.post.list);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IPostForm>
          initialValues={{
            name: {
              az: "",
              en: "",
              ru: "",
            },
            parentId: "",
          }}
          validationSchema={postFormValidation}
          {...props}
        >
          {() => (
            <>
              <TextInput label="Name Az" name="name.az" />
              <TextInput label="Name En" name="name.en" />
              <TextInput label="Name Ru" name="name.ru" />

              <SelectInput<IPost>
                options={postListBranch}
                label="Parent"
                name="parentId"
                renderLabel={(e) => e.name.az}
              />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
