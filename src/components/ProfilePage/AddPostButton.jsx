import React from "react";
import { Button, Icon } from "@material-ui/core";
import { addPostAC, updateNewPostTextAC } from "../../redux/profileReducer";

export const AddPostButton = (props) => {
  let onAddPost = () => {
    props.dispatch(addPostAC());
  };

  let updateNewPostText = (e) => {
    let text = e.target.value;
    props.dispatch(updateNewPostTextAC(text));
  };
  return (
    <>
      <div className="form-group ">
        <textarea
          onChange={updateNewPostText}
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
    </>
  );
};
