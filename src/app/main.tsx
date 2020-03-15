import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import { Layout } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { IAppReduxState } from "./redux/store";
import { IAsyncData } from "./core/models";
import { LoadingScreen } from "./components/loading_screen";
import { authRedux } from "./modules/auth/ui/state/state";
import { isLoading } from "./core/redux";
import { LoginPage } from "./modules/auth/ui/pages/login_page";
import { UserMainPage } from "./modules/user/ui/pages/main_page";
import { ProfileMainPage } from "./modules/profile/ui/pages/main_page";
import { MemberMainPage } from "./modules/members/ui/pages/main_page";
import { CategoryMainPage } from "./modules/category/ui/pages/main_page";
import { PostMainPage } from "./modules/post/ui/pages/main_page";

export const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authRedux.actions.checkAuth());
  }, [dispatch]);

  const isLoggedInBranch = useSelector<IAppReduxState, IAsyncData<boolean>>((state) => state.auth.isLoggedIn);
  const loading = isLoading(isLoggedInBranch);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : isLoggedInBranch.data ? (
        <Layout>
          <Switch>
            <Route path={ROUTES.user}>
              <UserMainPage />
            </Route>

            <Route path={ROUTES.profile}>
              <ProfileMainPage />
            </Route>

            <Route path={ROUTES.members}>
              <MemberMainPage />
            </Route>

            <Route path={ROUTES.category}>
              <CategoryMainPage />
            </Route>

            <Route path={ROUTES.post}>
              <PostMainPage />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      ) : (
        <Switch>
          <Route path={ROUTES.login}>
            <LoginPage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.login} />
          </Route>
        </Switch>
      )}
    </div>
  );
};
