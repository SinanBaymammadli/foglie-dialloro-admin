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
import { categoryFromJson, ICategory } from "../../category/data/entities";

interface IProjectBase {
  title: IMultiLang;
  client: IMultiLang;
  location: IMultiLang;
  scale: IMultiLang;
  content: IMultiLang;
  file: Maybe<File>;
  categoryId: string;
}

export interface IProjectForm extends IProjectBase {}

export interface IProject extends IProjectBase, IBasicEntity {
  category: ICategory;
  banner: IImage;
}

const projectCommonValidation = {
  title: multiLangValidation.required(),
  client: multiLangValidation.required(),
  location: multiLangValidation.required(),
  scale: multiLangValidation.required(),
  content: multiLangValidation.required(),
  categoryId: Yup.string().required(),
};

export const projectFormValidation = Yup.object<IProjectForm>({
  ...projectCommonValidation,
  file: fileValidation.required(),
});

export const projectEditFormValidation = Yup.object<IProjectForm>({
  ...projectCommonValidation,
  file: fileValidation,
});

export const projectFromJson = (json: any): IProject => {
  const e: IProject = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    client: multiLangFromJson(json, "client"),
    location: multiLangFromJson(json, "location"),
    scale: multiLangFromJson(json, "scale"),
    content: multiLangFromJson(json, "content"),
    category: categoryFromJson(json.category),
    categoryId: json.category.id,
    file: null,
    banner: generateImage(json.banner),
  };

  return e;
};

export const projectToJson = (form: IProjectForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.client, "client"),
    ...multiLangToJson(form.location, "location"),
    ...multiLangToJson(form.scale, "scale"),
    ...multiLangToJson(form.content, "content"),
    category: {
      id: form.categoryId,
    },
    file: form.file,
  };
};
