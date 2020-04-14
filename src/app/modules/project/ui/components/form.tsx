import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { RichEditor } from "../../../../components/rich_editor";
import { SelectInput } from "../../../../components/select_input";
import { TextInput } from "../../../../components/text_input";
import { IAsyncData, IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IAppReduxState } from "../../../../redux/store";
import { ICategory } from "../../../category/data/entities";
import { categoryReduxActions } from "../../../category/ui/state/state";
import { IFile } from "../../../file/data/entities";
import { fileReduxActions } from "../../../file/ui/state/state";
import { IProjectForm, projectFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IProjectForm> {}

export const ProjectForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryReduxActions.getList());
    dispatch(fileReduxActions.getList());
  }, [dispatch]);
  const categoryListBranch = useSelector<IAppReduxState, IAsyncData<ICategory[]>>((state) => state.category.list);
  const fileListBranch = useSelector<IAppReduxState, IAsyncData<IFile[]>>((state) => state.file.list);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IProjectForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            client: {
              az: "",
              en: "",
              ru: "",
            },
            location: {
              az: "",
              en: "",
              ru: "",
            },
            scale: {
              az: "",
              en: "",
              ru: "",
            },
            content: {
              az: "",
              en: "",
              ru: "",
            },
            categoryId: "",
            imageId: "",
          }}
          validationSchema={projectFormValidation}
          {...props}
        >
          {({ setFieldValue, values }) => (
            <>
              <SelectInput<IFile>
                options={fileListBranch}
                label="Image"
                name="imageId"
                renderLabel={(img) => <img src={img.image.url} width={50} height={50} alt="" />}
              />

              <TextInput label="Title Az" name="title.az" />
              <TextInput label="Title En" name="title.en" />
              <TextInput label="Title Ru" name="title.ru" />

              <TextInput label="client Az" name="client.az" />
              <TextInput label="client En" name="client.en" />
              <TextInput label="client Ru" name="client.ru" />

              <TextInput label="location Az" name="location.az" />
              <TextInput label="location En" name="location.en" />
              <TextInput label="location Ru" name="location.ru" />

              <TextInput label="scale Az" name="scale.az" />
              <TextInput label="scale En" name="scale.en" />
              <TextInput label="scale Ru" name="scale.ru" />

              <RichEditor label="Content az" name="content.az" setFieldValue={setFieldValue} />
              <RichEditor label="Content en" name="content.en" setFieldValue={setFieldValue} />
              <RichEditor label="Content ru" name="content.ru" setFieldValue={setFieldValue} />

              <SelectInput<ICategory>
                options={categoryListBranch}
                label="Category"
                name="categoryId"
                value={values.categoryId}
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
