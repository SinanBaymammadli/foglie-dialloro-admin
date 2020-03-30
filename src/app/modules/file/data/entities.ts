import * as Yup from "yup";

import { fileValidation } from "../../../core/file";
import { basicEntityFromJson, generateImage, IBasicEntity, IImage, Maybe } from "../../../core/models";

interface IFileBase {
  file: Maybe<File>;
}

export interface IFileForm extends IFileBase {}

export interface IFile extends IFileBase, IBasicEntity {
  image: IImage;
}

const fileCommonValidation = {};

export const fileFormValidation = Yup.object<IFileForm>({
  ...fileCommonValidation,
  file: fileValidation.required(),
});

export const fileEditFormValidation = Yup.object<IFileForm>({
  ...fileCommonValidation,
  file: fileValidation,
});

export const fileFromJson = (json: any): IFile => {
  const e: IFile = {
    ...basicEntityFromJson(json),
    image: generateImage(json),
    file: null,
  };

  return e;
};

export const fileToJson = (form: IFileForm) => {
  return {
    file: form.file,
  };
};
