import React from "react";
import classes from "./Profile.module.css";
import { Post } from "./Post/Post";
import { AddPostButton } from "./AddPostButton";

export const Profile = (props) => {
  let posts = props.postData.map((post) => (
    <Post text={post.text} key={post.id} />
  ));

  return (
    <div className={classes.wrapper}>
      <AddPostButton />
      <div className="pt-2">
        <h3 style={{ color: "white" }}>My posts </h3>
        {posts}
      </div>
    </div>
  );
};
