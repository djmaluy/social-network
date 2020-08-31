import React from "react";
import classes from "./Profile.module.css";
import { Post } from "./Post/Post";
import { AddPostButton } from "./AddPostButton";

export const Profile = (props) => {
  let posts = props.profilePage.postData.map((post) => (
    <Post text={post.text} key={post.id} />
  ));

  return (
    <div className={classes.wrapper}>
      <AddPostButton
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
        newPostText={props.profilePage.newPostText}
      />
      <div className="pt-2">
        <h3 style={{ color: "white" }}>My posts </h3>
        {posts}
      </div>
    </div>
  );
};
