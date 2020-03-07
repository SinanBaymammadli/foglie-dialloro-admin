import * as Yup from "yup";
import {
  IBasicEntity,
  basicEntityFromJson,
  IMultiLang,
  multiLangValidation,
  multiLangFromJson,
  multiLangToJson,
} from "../../../core/models";

interface IMemberBase {
  firstName: IMultiLang;
  lastName: IMultiLang;
  position: IMultiLang;
}

export interface IMember extends IMemberBase, IBasicEntity {}

export interface IMemberForm extends IMemberBase {}

const memberCommonValidation = {
  firstName: multiLangValidation.required(),
  lastName: multiLangValidation.required(),
  position: multiLangValidation.required(),
};

export const memberFormValidation = Yup.object<IMemberForm>({
  ...memberCommonValidation,
});

export const memberEditFormValidation = Yup.object<IMemberForm>({
  ...memberCommonValidation,
});

export const memberFromJson = (json: any): IMember => {
  const e: IMember = {
    ...basicEntityFromJson(json),
    firstName: multiLangFromJson(json, "firstName"),
    lastName: multiLangFromJson(json, "lastName"),
    position: multiLangFromJson(json, "position"),
  };

  return e;
};

export const memberToJson = (form: IMemberForm) => {
  return {
    ...multiLangToJson(form.firstName, "firstName"),
    ...multiLangToJson(form.lastName, "lastName"),
    ...multiLangToJson(form.position, "position"),
  };
};
