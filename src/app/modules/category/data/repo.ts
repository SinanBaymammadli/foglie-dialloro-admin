import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { ICategory, ICategoryForm, categoryFromJson, categoryToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface ICategoryRepo extends ICRUDRepo<ICategory, ICategoryForm> {}

const URL = "v1/categories";

const CategoryRepoImplFactory = (apiClient: ApiClient): ICategoryRepo => {
  const r: ICategoryRepo = {
    ...generateCrudRepoFactory<ICategory, ICategoryForm>(apiClient, URL, categoryFromJson, categoryToJson),
  };

  return r;
};

export const CategoryRepoImpl = CategoryRepoImplFactory(apiClient);
