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

interface IAboutBase {
  title: IMultiLang;
  text: IMultiLang;
  file: Maybe<File>;
}

export interface IAboutForm extends IAboutBase {}

export interface IAbout extends IAboutBase, IBasicEntity {
  image: IImage;
}

const aboutCommonValidation = {
  title: multiLangValidation.required(),
  text: multiLangValidation.required(),
};

export const aboutFormValidation = Yup.object<IAboutForm>({
  ...aboutCommonValidation,
  file: fileValidation.required(),
});

export const aboutEditFormValidation = Yup.object<IAboutForm>({
  ...aboutCommonValidation,
  file: fileValidation,
});

export const aboutFromJson = (json: any): IAbout => {
  const e: IAbout = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    text: multiLangFromJson(json, "text"),
    file: null,
    image: generateImage(json.image),
  };

  return e;
};

export const aboutToJson = (form: IAboutForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.text, "text"),
    file: form.file,
  };
};
