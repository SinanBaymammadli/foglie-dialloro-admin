import React, { useEffect } from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps, IAsyncData } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { projectFormValidation, IProjectForm, IProject } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";
import { SelectInput } from "../../../../components/select_input";
import { useDispatch, useSelector } from "react-redux";
import { projectReduxActions } from "../state/state";
import { IAppReduxState } from "../../../../redux/store";

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
