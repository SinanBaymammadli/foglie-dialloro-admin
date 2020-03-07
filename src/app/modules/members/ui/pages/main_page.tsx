import React from "react";
import { Switch, Route } from "react-router-dom";
import { MemberListPage } from "./list_page";
import { MemberCreatePage } from "./create_page";
import { MemberEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { MemberDetailPage } from "./detail_page";

export const MemberMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.members} exact>
        <MemberListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.members)}>
        <MemberCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.members)}>
        <MemberEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.members)}>
        <MemberDetailPage />
      </Route>
    </Switch>
  );
};
