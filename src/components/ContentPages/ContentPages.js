import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DialogsContainer from "../DialogsPage/DialogsContainer";
import { Login } from "../Login/Login";
import { Music } from "../MusicPage/Music";
import { News } from "../NewsPage/News";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ProfileContainer } from "../ProfilePage/ProfileContainer";

const SuspenseChatPage = React.lazy(() => import("../chatPage/ChatPage"));
const SuspenseUsersPage = React.lazy(() =>
  import("../../components/UsersPage/UsersPage")
);

export const ContentPages = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/profile" />
      </Route>
      <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
      <Route path="/dialogs" render={() => <DialogsContainer />} />
      <Route path="/news" component={News} />
      <Suspense fallback={<div>Загрузка...</div>}>
        <Route path="/users" component={SuspenseUsersPage} />
        <Route path="/chat" component={SuspenseChatPage} />
      </Suspense>
      <Route path="/music" component={Music} />
      <Route path="/login" component={Login} />

      <Route component={PageNotFound} />
    </Switch>
  );
};
