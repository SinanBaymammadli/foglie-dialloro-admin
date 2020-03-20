import * as Yup from "yup";

import {
  basicEntityFromJson,
  IBasicEntity,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface IProjectBase {
  name: IMultiLang;
  parentId: string;
}

export interface IProjectForm extends IProjectBase {}

export interface IProject extends IProjectBase, IBasicEntity {
  parent?: IProject;
  children?: IProject[];
}

const projectCommonValidation = {
  name: multiLangValidation.required(),
  parentId: Yup.string(),
};

export const projectFormValidation = Yup.object<IProjectForm>({
  ...projectCommonValidation,
});

export const projectEditFormValidation = Yup.object<IProjectForm>({
  ...projectCommonValidation,
});

export const projectFromJson = (json: any): IProject => {
  const e: IProject = {
    ...basicEntityFromJson(json),
    name: multiLangFromJson(json, "name"),
    parent: json.parent,
    parentId: json.parent?.id,
    children: json.children?.map(projectFromJson),
  };

  return e;
};

export const projectToJson = (form: IProjectForm) => {
  return {
    ...multiLangToJson(form.name, "name"),
    parent: { id: form.parentId },
  };
};
