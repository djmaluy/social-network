import React from "react";
import userPhoto from "../../assets/images/userPhoto.png";
import classes from "./Profile.module.css";

export const ProfileAvatar = ({ profile }) => {
  return (
    <div>
      <img
        src={profile.photos.large || userPhoto}
        alt=""
        className={classes.userAvatar}
      />
    </div>
  );
};
