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
  gitBranch: process.env.REACT_APP_GIT_BRANCH,
});

export const EnvService = EnvServiceFactory();
