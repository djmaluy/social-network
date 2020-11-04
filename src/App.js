import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import { News } from "./components/NewsPage/News";
import "./App.css";
import { Music } from "./components/MusicPage/Music";
import { Row, Col } from "react-bootstrap";
import UsersContainer from "./components/UsersPage/UsersContainer";
import DialogsContainer from "./components/DialogsPage/DialogsContainer";
import ProfileContainer from "./components/ProfilePage/ProfileContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="wrapper">
      <NavbarContainer />
      <Row>
        <Col sm={2} className="sidebar p-0 m-0">
          <Sidebar />
        </Col>
        <Col sm={10} className="p-0">
          <Switch className="p-0">
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/news" component={News} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/music" component={Music} />
            <Route path="/login" component={Login} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default App;
