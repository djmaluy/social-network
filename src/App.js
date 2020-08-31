import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import { Profile } from "./components/ProfilePage/Profile";
import { Dialogs } from "./components/DialogsPage/Dialogs";
import { News } from "./components/NewsPage/News";
import "./App.css";
import { Users } from "./components/UsersPage/Users";
import { Music } from "./components/MusicPage/Music";
import { Row, Col } from "react-bootstrap";

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
            <Route
              path="/profile"
              render={() => (
                <Profile
                  profilePage={props.state.profilePage}
                  addPost={props.addPost}
                  updateNewPostText={props.updateNewPostText}
                />
              )}
            />
            <Route
              path="/dialogs"
              render={() => (
                <Dialogs
                  addMessage={props.addMessage}
                  dialogsPage={props.state.dialogsPage}
                  updateNewDialogText={props.updateNewDialogText}
                />
              )}
            />
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
