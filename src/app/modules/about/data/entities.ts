import * as yup from "yup";

import {
  basicEntityFromJson,
  generateImage,
  IBasicEntity,
  IImage,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IAboutBase {
  title: IMultiLang;
  text: IMultiLang;
  imageId: string;
}

export interface IAboutForm extends IAboutBase {}

export interface IAbout extends IAboutBase, IBasicEntity {
  image: IImage;
}

const aboutCommonValidation = {
  title: multiLangValidation.required(),
  text: multiLangValidation.required(),
  imageId: yup.string().required(),
};

export const aboutFormValidation = yup.object<IAboutForm>({
  ...aboutCommonValidation,
});

export const aboutEditFormValidation = yup.object<IAboutForm>({
  ...aboutCommonValidation,
});

export const aboutFromJson = (json: any): IAbout => {
  const e: IAbout = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    text: multiLangFromJson(json, "text"),
    image: generateImage(json.image),
    imageId: json.image.id,
  };

  return e;
};

export const aboutToJson = (form: IAboutForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.text, "text"),
    image: {
      id: form.imageId,
    },
  };
};
