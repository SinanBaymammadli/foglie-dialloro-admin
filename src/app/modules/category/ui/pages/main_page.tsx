import React from "react";
import { Switch, Route } from "react-router-dom";
import { CategoryListPage } from "./list_page";
import { CategoryCreatePage } from "./create_page";
import { CategoryEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { CategoryDetailPage } from "./detail_page";

export const CategoryMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.category} exact>
        <CategoryListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.category)}>
        <CategoryCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.category)}>
        <CategoryEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.category)}>
        <CategoryDetailPage />
      </Route>
    </Switch>
  );
};
