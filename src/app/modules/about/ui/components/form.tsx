import { Grid } from "@material-ui/core";
import React from "react";

import { FileInput } from "../../../../components/file_input";
import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { RichEditor } from "../../../../components/rich_editor";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { aboutFormValidation, IAboutForm } from "../../data/entities";

interface IProps extends IFormProps<IAboutForm> {}

export const AboutForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IAboutForm>
          initialValues={{
            title: {
              az: "",
              en: "",
              ru: "",
            },
            text: {
              az: "",
              en: "",
              ru: "",
            },
            file: undefined,
          }}
          validationSchema={aboutFormValidation}
          {...props}
        >
          {({ setFieldValue }) => (
            <>
              <TextInput label="Title Az" name="title.az" />
              <RichEditor label="Text az" name="text.az" setFieldValue={setFieldValue} />

              <TextInput label="Title en" name="title.en" />
              <RichEditor label="Text en" name="text.en" setFieldValue={setFieldValue} />

              <TextInput label="Title ru" name="title.ru" />
              <RichEditor label="Text ru" name="text.ru" setFieldValue={setFieldValue} />

              <FileInput label="Image" name="file" setFieldValue={setFieldValue} />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
