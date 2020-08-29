import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import classes from "./Profile.module.css";
import { Post } from "./Post/Post";

export const Profile = () => {
  return (
    <div className={classes.wrapper}>
      <h1>Profile page</h1>
      <div>
        <div className="form-group ">
          <textarea placeholder="Enter your message..."></textarea>
        </div>
        <div>
          <Button
            className="mb-3"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Add post
          </Button>
        </div>
      </div>
      <strong style={{ color: "white" }}>My posts </strong>
      <Post message="hi" />
      <Post message="hi hi hi" />
      <Post message="yo" />
    </div>
  );
};
