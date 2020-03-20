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

interface IPostBase {
  title: IMultiLang;
  description: IMultiLang;
  content: IMultiLang;
  file: Maybe<File>;
}

export interface IPostForm extends IPostBase {}

export interface IPost extends IPostBase, IBasicEntity {
  banner: IImage;
}

const postCommonValidation = {
  title: multiLangValidation.required(),
  description: multiLangValidation.required(),
  content: multiLangValidation.required(),
};

export const postFormValidation = Yup.object<IPostForm>({
  ...postCommonValidation,
  file: fileValidation.required(),
});

export const postEditFormValidation = Yup.object<IPostForm>({
  ...postCommonValidation,
  file: fileValidation,
});

export const postFromJson = (json: any): IPost => {
  const e: IPost = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    description: multiLangFromJson(json, "description"),
    content: multiLangFromJson(json, "content"),
    file: null,
    banner: generateImage(json.banner),
  };

  return e;
};

export const postToJson = (form: IPostForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.description, "description"),
    ...multiLangToJson(form.content, "content"),
    file: form.file,
  };
};
