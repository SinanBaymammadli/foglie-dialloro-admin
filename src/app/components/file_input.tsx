import React from "react";
import { Field, FieldProps } from "formik";
import { FormHelperText, Box } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { MAX_FILE_SIZE } from "../core/file";

interface IProps {
  label?: string;
  name: string;
  defaultImage?: string;
  setFieldValue: (fieldName: any, value: any) => void;
}

export const FileInput: React.FC<IProps> = ({ name, setFieldValue }: IProps) => {
  return (
    <Field name={name}>
      {({ meta }: FieldProps) => {
        const hasError = Boolean(meta.touched && meta.error);

        return (
          <Box mt={2} mb={1}>
            {/* {label && <InputLabel>{label}</InputLabel>} */}

            <Box mt={1}>
              {/* <input
                accept="image/*"
                type="file"
                name={name}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  console.log(file);
                  setFieldValue(name, file);
                }}
                onBlur={field.onBlur}
              /> */}
              <ImageUploader
                withIcon={true}
                withPreview
                buttonText="Choose images"
                // defaultImages={[defaultImage]}
                label="Max file size: 0.5mb. Accepted: '.jpg', '.png', '.gif'"
                onChange={(files) => {
                  setFieldValue(name, files[0]);
                }}
                imgExtension={[".jpg", ".png", ".gif"]}
                maxFileSize={MAX_FILE_SIZE}
              />
              {hasError && <FormHelperText error>{meta.error}</FormHelperText>}
            </Box>
          </Box>
        );
      }}
    </Field>
  );
};
