import { Grid } from "@material-ui/core";
import React from "react";

import { FileInput } from "../../../../components/file_input";
import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { RichEditor } from "../../../../components/rich_editor";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IPostForm, postFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IPostForm> {}

export const PostForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IPostForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            description: {
              az: "",
              en: "",
              ru: "",
            },
            content: {
              az: "",
              en: "",
              ru: "",
            },
            file: undefined,
          }}
          validationSchema={postFormValidation}
          {...props}
        >
          {({ setFieldValue }) => (
            <>
              <FileInput label="Image" name="file" setFieldValue={setFieldValue} />

              <TextInput label="Title az" name="title.az" />
              <TextInput label="Description az" name="description.az" />
              <RichEditor label="Content az" name="content.az" setFieldValue={setFieldValue} />

              <TextInput label="Title en" name="title.en" />
              <TextInput label="Description en" name="description.en" />
              <RichEditor label="Content en" name="content.en" setFieldValue={setFieldValue} />

              <TextInput label="Title ru" name="title.ru" />
              <TextInput label="Description ru" name="description.ru" />
              <RichEditor label="Content ru" name="content.ru" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
