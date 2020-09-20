import {
  addPost,
  updateNewPostText,
  setUsersProfile,
} from "../../redux/profileReducer";
import { connect } from "react-redux";
import axios from "axios";
import React, { Component } from "react";
import { Profile } from "./Profile";

class ProfileContainer extends Component {
  componentDidMount() {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0//profile/2`)
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
    newPostText: state.profilePage.newPostText,
    profilePage: state.profilePage,
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, {
  addPost,
  updateNewPostText,
  setUsersProfile,
})(ProfileContainer);
