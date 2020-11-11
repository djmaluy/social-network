import {
  setUsersProfile,
  getProfile,
  getStatus,
  updateStatus,
} from "../../redux/profileReducer";
import { connect } from "react-redux";
import React, { Component } from "react";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {
//   setUsersProfile,
//   getProfile,
// })(WithUrlDataContainerComponent);

export default compose(
  connect(mapStateToProps, {
    setUsersProfile,
    getProfile,
    getStatus,
    updateStatus,
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
