import { Box, FormHelperText, InputLabel } from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React from "react";
import ReactQuill from "react-quill";

interface IProps {
  label: string;
  name: string;
  setFieldValue: (fieldName: any, value: any) => void;
}

export const RichEditor: React.FC<IProps> = ({ label, name, setFieldValue }: IProps) => {
  return (
    <Field name={name}>
      {({ meta }: FieldProps): JSX.Element => {
        const hasError = Boolean(meta.touched && meta.error);

        return (
          <Box mb={2}>
            <Box mb={1}>
              <InputLabel>{label}</InputLabel>
            </Box>

            <ReactQuill
              value={meta.value}
              onChange={(text) => {
                setFieldValue(name, text);
              }}
            />

            {hasError && <FormHelperText error>{meta.error?.toString()}</FormHelperText>}
          </Box>
        );
      }}
    </Field>
  );
};
