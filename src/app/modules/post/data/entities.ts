import * as Yup from "yup";

import {
  basicEntityFromJson,
  IBasicEntity,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IPostBase {
  name: IMultiLang;
  parentId: string;
}

export interface IPostForm extends IPostBase {}

export interface IPost extends IPostBase, IBasicEntity {
  parent?: IPost;
  children?: IPost[];
}

const postCommonValidation = {
  name: multiLangValidation.required(),
  parentId: Yup.string(),
};

export const postFormValidation = Yup.object<IPostForm>({
  ...postCommonValidation,
});

export const postEditFormValidation = Yup.object<IPostForm>({
  ...postCommonValidation,
});

export const postFromJson = (json: any): IPost => {
  const e: IPost = {
    ...basicEntityFromJson(json),
    name: multiLangFromJson(json, "name"),
    parent: json.parent,
    parentId: json.parent?.id,
    children: json.children?.map(postFromJson),
  };

  return e;
};

export const postToJson = (form: IPostForm) => {
  return {
    ...multiLangToJson(form.name, "name"),
    parent: { id: form.parentId },
  };
};
