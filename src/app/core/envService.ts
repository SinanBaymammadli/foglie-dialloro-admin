interface IEnvProfile {
  profile: "prod" | "dev" | "local";
}

function EnvServiceFactory(): IEnvProfile {
  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_GIT_BRANCH === "master") {
    return { profile: "prod" };
  }

  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_GIT_BRANCH === "develop") {
    return { profile: "dev" };
  }

  return { profile: "local" };
}

console.log({
  nodeEnv: process.env.NODE_ENV,
  profile: process.env.REACT_APP_ENV_PROFILE,
});

export const EnvService = EnvServiceFactory();
