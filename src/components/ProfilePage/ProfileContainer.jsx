import { setUsersProfile } from "../../redux/profileReducer";
import { connect } from "react-redux";
import axios from "axios";
import React, { Component } from "react";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";

class ProfileContainer extends Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 8369;
    }
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
      .then((res) => {
        this.props.setUsersProfile(res.data);
      });
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
})(WithUrlDataContainerComponent);
