import * as Yup from "yup";
import {
  IBasicEntity,
  basicEntityFromJson,
  IMultiLang,
  multiLangValidation,
  multiLangFromJson,
  multiLangToJson,
  Maybe,
  IImage,
  generateImage,
} from "../../../core/models";
import { fileValidation } from "../../../core/file";

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
