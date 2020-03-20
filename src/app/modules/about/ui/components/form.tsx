import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { FileInput } from "../../../../components/file_input";
import { Form } from "../../../../components/form";
import { FormButton } from "../../../../components/form_button";
import { RichEditor } from "../../../../components/rich_editor";
import { IFormProps } from "../../../../core/models";
import { isPending } from "../../../../core/redux";
import { aboutFormValidation, IAboutForm } from "../../data/entities";
import { aboutReduxActions } from "../state/state";

interface IProps extends IFormProps<IAboutForm> {}

export const AboutForm: React.FC<IProps> = (props: IProps) => {
  const { branch, submitTitle } = props;
  const loading = isPending(branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutReduxActions.getList());
  }, [dispatch]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={8} lg={6}>
        <Form<IAboutForm>
          initialValues={{
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
              <RichEditor label="Text az" name="text.az" setFieldValue={setFieldValue} />
              <RichEditor label="Text en" name="text.en" setFieldValue={setFieldValue} />
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
