import React from "react";
import { addPost, updateNewPostText } from "../../redux/profileReducer";
import { connect } from "react-redux";
import MyPosts from "./MyPosts";

export const MyPostsContainer = (props) => {
  let state = props.store.getState();
  let onAddPost = () => {
    props.store.dispatch(addPost());
  };

  let onPostChange = (text) => {
    props.store.dispatch(updateNewPostText(text));
  };

  return (
    <MyPosts
      updateNewPostText={onPostChange}
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

export default connect(mapStateToProps, {
  addPost,
  updateNewPostText,
})(MyPosts);
