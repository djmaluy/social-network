import React, { Component } from "react";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { compose } from "redux";
import Preloader from "./common/Preloader/Preloader";
import { Layout } from "antd";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ContentPages } from "./components/ContentPages/ContentPages";
import { Navbar } from "./components/Navbar/Navbar";

const { Header, Content, Sider } = Layout;

class App extends Component {
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
      <Layout>
        <Header className="header">
          <Navbar />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Sidebar />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background "
              style={{
                padding: 10,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ContentPages />
            </Content>
          </Layout>
        </Layout>
      </Layout>
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
