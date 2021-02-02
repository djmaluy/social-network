import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import DialogsContainer from "../DialogsPage/DialogsContainer";
import { Login } from "../Login/Login";
import { Music } from "../MusicPage/Music";
import { News } from "../NewsPage/News";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ProfileContainer } from "../ProfilePage/ProfileContainer";
import { UsersPage } from "../UsersPage/UsersPage";

export const ContentPages = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/profile" />
      </Route>
      <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
      <Route path="/dialogs" render={() => <DialogsContainer />} />
      <Route path="/news" component={News} />
      <Route path="/users" component={UsersPage} />
      <Route path="/music" component={Music} />
      <Route path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
};
