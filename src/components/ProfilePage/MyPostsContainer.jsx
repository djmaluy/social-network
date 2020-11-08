import React from "react";
import { addPost } from "../../redux/profileReducer";
import { connect } from "react-redux";
import MyPosts from "./MyPosts";
import { compose } from "redux";

export const MyPostsContainer = (props) => {
  let state = props.store.getState();
  let onAddPost = (newPostText) => {
    props.store.dispatch(addPost(newPostText));
  };

  return (
    <MyPosts
      addPost={onAddPost}
      postData={state.profilePge.postData}
      newPostText={state.profilePge.newPostText}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    newPostText: state.profilePage.newPostText,
    postData: state.profilePage.postData,
  };
};

export default compose(
  connect(mapStateToProps, {
    addPost,
  })
)(MyPosts);
