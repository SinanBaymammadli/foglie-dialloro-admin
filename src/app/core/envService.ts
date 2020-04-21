interface IEnvProfile {
  profile: "prod" | "dev" | "local";
}

function EnvServiceFactory(): IEnvProfile {
  if (process.env.NODE_ENV === "production" && process.env.GIT_BRANCH === "master") {
    return { profile: "prod" };
  }

  if (process.env.NODE_ENV === "production" && process.env.GIT_BRANCH === "develop") {
    return { profile: "dev" };
  }

  return { profile: "local" };
}

export const EnvService = EnvServiceFactory();
