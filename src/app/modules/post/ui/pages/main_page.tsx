import React from "react";
import { Switch, Route } from "react-router-dom";
import { PostListPage } from "./list_page";
import { PostCreatePage } from "./create_page";
import { PostEditPage } from "./edit_page";
import { ROUTES } from "../../../../routes";
import { Routing } from "../../../../core/routing";
import { PostDetailPage } from "./detail_page";

export const PostMainPage: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.post} exact>
        <PostListPage />
      </Route>

      <Route path={Routing.generateCreateRoute(ROUTES.post)}>
        <PostCreatePage />
      </Route>

      <Route path={Routing.generateEditRoute(ROUTES.post)}>
        <PostEditPage />
      </Route>

      <Route path={Routing.generateDetailRoute(ROUTES.post)}>
        <PostDetailPage />
      </Route>
    </Switch>
  );
};
