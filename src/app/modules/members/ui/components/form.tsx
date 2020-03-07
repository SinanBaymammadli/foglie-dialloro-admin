import React from "react";
import { TextInput } from "../../../../components/text_input";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { memberFormValidation, IMemberForm } from "../../data/entities";
import { FormButton } from "../../../../components/form_button";
import { Form } from "../../../../components/form";
import { Grid } from "@material-ui/core";

interface IProps extends IFormProps<IMemberForm> {}

export const MemberForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);

  return (
    <Grid container justify="center">
      <Grid item md={8} lg={6}>
        <Form<IMemberForm>
          {...props}
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
          }}
          validationSchema={memberFormValidation}
        >
          {() => (
            <>
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