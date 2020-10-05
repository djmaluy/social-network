import { setUsersProfile, getProfile } from "../../redux/profileReducer";
import { connect } from "react-redux";
import React, { Component } from "react";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8369;
    }
    this.props.getProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  };
};

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUsersProfile,
  getProfile,
})(WithUrlDataContainerComponent);
