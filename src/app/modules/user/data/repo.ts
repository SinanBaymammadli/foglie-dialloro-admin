import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { IUser, IUserForm, userFromJson, userToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IUserRepo extends ICRUDRepo<IUser, IUserForm> {}

const URL = "v1/user";

const UserRepoImplFactory = (apiClient: ApiClient): IUserRepo => {
  const r: IUserRepo = {
    ...generateCrudRepoFactory<IUser, IUserForm>(apiClient, URL, userFromJson, userToJson),
  };

  return r;
};

export const UserRepoImpl = UserRepoImplFactory(apiClient);
