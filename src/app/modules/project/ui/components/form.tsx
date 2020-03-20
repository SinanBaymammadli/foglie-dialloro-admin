import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { SelectInput } from "../../../../components/select_input";
import { TextInput } from "../../../../components/text_input";
import { IAsyncData, IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IAppReduxState } from "../../../../redux/store";
import { IProject, IProjectForm, projectFormValidation } from "../../data/entities";
import { projectReduxActions } from "../state/state";

interface IProps extends IFormProps<IProjectForm> {}

export const ProjectForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectReduxActions.getList());
  }, [dispatch]);
  const projectListBranch = useSelector<IAppReduxState, IAsyncData<IProject[]>>((state) => state.project.list);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IProjectForm>
          initialValues={{
            name: {
              az: "",
              en: "",
              ru: "",
            },
            parentId: "",
          }}
          validationSchema={projectFormValidation}
          {...props}
        >
          {() => (
            <>
              <TextInput label="Name Az" name="name.az" />
              <TextInput label="Name En" name="name.en" />
              <TextInput label="Name Ru" name="name.ru" />

              <SelectInput<IProject>
                options={projectListBranch}
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
