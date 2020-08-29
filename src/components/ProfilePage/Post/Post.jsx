import React from "react";
import classes from "./Post.module.css";

export const Post = (props) => {
  return (
    <div className={classes.posts}>
      <div className={classes.post}>
        <img
          src="https://banner2.cleanpng.com/20180403/awe/kisspng-computer-icons-avatar-male-super-b-5ac405d5122261.8229479815227959890743.jpg"
          alt="ava"
          className={classes.avatar}
        />
        <span>{props.message}</span>
      </div>
    </div>
  );
};
