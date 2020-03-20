import { Grid } from "@material-ui/core";
import React from "react";

import { FileInput } from "../../../../components/file_input";
import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { IMemberForm, memberFormValidation } from "../../data/entities";

interface IProps extends IFormProps<IMemberForm> {}

export const MemberForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IMemberForm>
          initialValues={{
            firstName: {
              az: "",
              en: "",
              ru: "",
            },
            lastName: {
              az: "",
              en: "",
              ru: "",
            },
            position: {
              az: "",
              en: "",
              ru: "",
            },
            file: undefined,
          }}
          validationSchema={memberFormValidation}
          {...props}
        >
          {({ setFieldValue }) => (
            <>
              <FileInput label="Image" name="file" setFieldValue={setFieldValue} />

              <TextInput label="First name Az" name="firstName.az" />
              <TextInput label="First name En" name="firstName.en" />
              <TextInput label="First name Ru" name="firstName.ru" />
              <TextInput label="Last name Az" name="lastName.az" />
              <TextInput label="Last name En" name="lastName.en" />
              <TextInput label="Last name Ru" name="lastName.ru" />
              <TextInput label="Position Az" name="position.az" />
              <TextInput label="Position En" name="position.en" />
              <TextInput label="Position Ru" name="position.ru" />

              <FormButton label={submitTitle} loading={loading} />
            </>
          )}
        </Form>
      </Grid>
    </Grid>
  );
};
