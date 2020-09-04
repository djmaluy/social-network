import React from "react";
import classes from "./Profile.module.css";
import { Post } from "./Post/Post";
import { Button, Icon } from "@material-ui/core";

export const Profile = (props) => {
  let state = props.profilePage;
  let posts = state.postData.map((post) => (
    <Post text={post.text} key={post.id} />
  ));
  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = (e) => {
    let text = e.target.value;
    props.updateNewPostText(text);
  };
  return (
    <div className={classes.wrapper}>
      <div className="form-group ">
        <textarea
          onChange={onPostChange}
          placeholder="Enter your message..."
          value={props.newPostText}
        />
      </div>
      <Button
        onClick={onAddPost}
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Add post
      </Button>
      <div className="pt-2">
        <h3 style={{ color: "white" }}>My posts </h3>
        {posts}
      </div>
    </div>
  );
};
