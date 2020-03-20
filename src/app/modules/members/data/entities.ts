import * as Yup from "yup";

import { fileValidation } from "../../../core/file";
import {
  basicEntityFromJson,
  generateImage,
  IBasicEntity,
  IImage,
  IMultiLang,
  Maybe,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IMemberBase {
  firstName: IMultiLang;
  lastName: IMultiLang;
  position: IMultiLang;
  file: Maybe<File>;
}

export interface IMember extends IMemberBase, IBasicEntity {
  image: IImage;
}

export interface IMemberForm extends IMemberBase {}

const memberCommonValidation = {
  firstName: multiLangValidation.required(),
  lastName: multiLangValidation.required(),
  position: multiLangValidation.required(),
};

export const memberFormValidation = Yup.object<IMemberForm>({
  ...memberCommonValidation,
  file: fileValidation.required(),
});

export const memberEditFormValidation = Yup.object<IMemberForm>({
  ...memberCommonValidation,
  file: fileValidation,
});

export const memberFromJson = (json: any): IMember => {
  const e: IMember = {
    ...basicEntityFromJson(json),
    firstName: multiLangFromJson(json, "firstName"),
    lastName: multiLangFromJson(json, "lastName"),
    position: multiLangFromJson(json, "position"),
    file: null,
    image: generateImage(json.image),
  };

  return e;
};

export const memberToJson = (form: IMemberForm) => {
  return {
    ...multiLangToJson(form.firstName, "firstName"),
    ...multiLangToJson(form.lastName, "lastName"),
    ...multiLangToJson(form.position, "position"),
    file: form.file,
  };
};
