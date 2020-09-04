import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import { News } from "./components/NewsPage/News";
import "./App.css";
import { Users } from "./components/UsersPage/Users";
import { Music } from "./components/MusicPage/Music";
import { Row, Col } from "react-bootstrap";
import DialogsContainer from "./components/DialogsPage/DialogsContainer";
import ProfileContainer from "./components/ProfilePage/ProfileContainer";

function App(props) {
  return (
    <div className="wrapper">
      <Navbar />
      <Row>
        <Col sm={2} className="sidebar p-0 m-0">
          <Sidebar />
        </Col>
        <Col sm={10} className="p-0">
          <Switch className="p-0">
            <Route path="/profile" render={() => <ProfileContainer />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/news" component={News} />
            <Route path="/users" component={Users} />
            <Route path="/music" component={Music} />
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default App;
