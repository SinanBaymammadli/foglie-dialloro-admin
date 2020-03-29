import * as Yup from "yup";

import {
  basicEntityFromJson,
  IBasicEntity,
  IMultiLang,
  multiLangFromJson,
  multiLangToJson,
  multiLangValidation,
} from "../../../core/models";

interface ISliderBase {
  title: IMultiLang;
  subtitle: IMultiLang;
  description: IMultiLang;
}

export interface ISliderForm extends ISliderBase {}

export interface ISlider extends ISliderBase, IBasicEntity {}

const sliderCommonValidation = {
  title: multiLangValidation.required(),
  subtitle: multiLangValidation.required(),
  description: multiLangValidation.required(),
};

export const sliderFormValidation = Yup.object<ISliderForm>({
  ...sliderCommonValidation,
});

export const sliderEditFormValidation = Yup.object<ISliderForm>({
  ...sliderCommonValidation,
});

export const sliderFromJson = (json: any): ISlider => {
  const e: ISlider = {
    ...basicEntityFromJson(json),
    title: multiLangFromJson(json, "title"),
    subtitle: multiLangFromJson(json, "subtitle"),
    description: multiLangFromJson(json, "description"),
  };

  return e;
};

export const sliderToJson = (form: ISliderForm) => {
  return {
    ...multiLangToJson(form.title, "title"),
    ...multiLangToJson(form.subtitle, "subtitle"),
    ...multiLangToJson(form.description, "description"),
  };
};
