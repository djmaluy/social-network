import React from "react";
import classes from "./Profile.module.css";

export const ChooseAvatarButton = ({ isOwner, onMainPhotoSelected }) => {
  return (
    <div>
      {isOwner && (
        <div className={classes.chooseAvatar}>
          <input
            type="file"
            onChange={onMainPhotoSelected}
            name="file"
            id="file"
            className={classes.inputfile}
          />
          <label htmlFor="file">Change avatar</label>
        </div>
      )}
    </div>
  );
};
