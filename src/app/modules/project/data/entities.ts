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
import { categoryFromJson, ICategory } from "../../category/data/entities";

interface IProjectBase {
  title: IMultiLang;
  client: IMultiLang;
  location: IMultiLang;
  scale: IMultiLang;
  content: IMultiLang;
  imageId: string;
  categoryId: string;
}

export interface IProjectForm extends IProjectBase {}

export interface IProject extends IProjectBase, IBasicEntity {
  category: ICategory;
  image: IImage;
}

const projectCommonValidation = {
  title: multiLangValidation.required(),
  client: multiLangValidation.required(),
  location: multiLangValidation.required(),
  scale: multiLangValidation.required(),
  content: multiLangValidation.required(),
  categoryId: yup.string().required(),
  imageId: yup.string().required(),
};

export const projectFormValidation = yup.object<IProjectForm>({
  ...projectCommonValidation,
});

export const projectEditFormValidation = yup.object<IProjectForm>({
  ...projectCommonValidation,
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
    imageId: json.image.id,
    image: generateImage(json.image),
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
    image: {
      id: form.imageId,
    },
  };
};
