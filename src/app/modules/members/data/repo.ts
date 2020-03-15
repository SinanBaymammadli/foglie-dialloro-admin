import { ApiClient, apiClient } from "../../../core/api_client";
import { ICRUDRepo } from "../../../core/models";
import { IMember, IMemberForm, memberFromJson, memberToJson } from "./entities";
import { generateCrudRepoFactory } from "../../../core/crud";

interface IMemberRepo extends ICRUDRepo<IMember, IMemberForm> {}

const URL = "v1/members";

const MemberRepoImplFactory = (apiClient: ApiClient): IMemberRepo => {
  const r: IMemberRepo = {
    ...generateCrudRepoFactory<IMember, IMemberForm>(apiClient, URL, memberFromJson, memberToJson, true),
  };

  return r;
};

export const MemberRepoImpl = MemberRepoImplFactory(apiClient);
