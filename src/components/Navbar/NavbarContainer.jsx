import React from "react";
import { Navbar } from "./Navbar";
import axios from "axios";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/authReducer";

class NavbarContainer extends React.Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          let { id, email, login } = res.data.data;
          this.props.setAuthUserData(id, email, login);
        }
      });
  }
  render() {
    return <Navbar {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { setAuthUserData })(NavbarContainer);
