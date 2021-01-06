import React, { Component, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Switch from "react-bootstrap/esm/Switch";
import { Redirect, Route, withRouter } from "react-router-dom";
import { News } from "./components/NewsPage/News";
import "./App.css";
import { Music } from "./components/MusicPage/Music";
import { Row, Col } from "react-bootstrap";
import UsersContainer from "./components/UsersPage/UsersContainer";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { compose } from "redux";
import Preloader from "./common/Preloader/Preloader";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const DialogsContainer = React.lazy(() =>
  import("./components/DialogsPage/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/ProfilePage/ProfileContainer")
);

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("some error");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillMount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div>
        <div className="wrapper">
          <NavbarContainer />
          <Row>
            <Col sm={2} className="sidebar p-0 m-0">
              <Sidebar />
            </Col>
            <Col sm={10} className="p-0">
              <Switch className="p-0">
                <Route exact path="/">
                  <Redirect to="/profile" />
                </Route>
                <Suspense fallback={<div>Загрузка...</div>}>
                  <Route
                    path="/profile/:userId?"
                    render={() => <ProfileContainer />}
                  />
                  <Route path="/dialogs" render={() => <DialogsContainer />} />
                </Suspense>
                <Route path="/news" component={News} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/music" component={Music} />{" "}
                <Route path="/login" component={Login} />
                <Route component={PageNotFound} />
              </Switch>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
