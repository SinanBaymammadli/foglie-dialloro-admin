import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProjectListPage } from "./list_page";
import { ProjectCreatePage } from "./create_page";
import { ProjectEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { ProjectDetailPage } from "./detail_page";

export const ProjectMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.project} exact>
        <ProjectListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.project)}>
        <ProjectCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.project)}>
        <ProjectEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.project)}>
        <ProjectDetailPage />
      </Route>
    </Switch>
  );
};
