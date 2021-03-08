import { Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to="login" />;
    return <Component {...props} />;
  };

  let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );
  return ConnectedAuthRedirect;
};
