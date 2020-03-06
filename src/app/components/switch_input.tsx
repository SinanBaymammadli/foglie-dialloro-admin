import React from "react";
import { Field, FieldProps } from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

interface IProps {
  label: string;
  name: string;
}

export const SwitchInput: React.FC<IProps> = ({ label, name }: IProps) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps): JSX.Element => {
        return (
          <FormControlLabel
            checked={meta.value}
            name={name}
            onChange={field.onChange}
            control={<Switch color="primary" />}
            label={label}
            labelPlacement="start"
          />
        );
      }}
    </Field>
  );
};
