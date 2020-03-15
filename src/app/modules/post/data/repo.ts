import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { IPost, IPostForm, postFromJson, postToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IPostRepo extends ICRUDRepo<IPost, IPostForm> {}

const URL = "v1/posts";

const PostRepoImplFactory = (apiClient: ApiClient): IPostRepo => {
  const r: IPostRepo = {
    ...generateCrudRepoFactory<IPost, IPostForm>(apiClient, URL, postFromJson, postToJson),
  };

  return r;
};

export const PostRepoImpl = PostRepoImplFactory(apiClient);
