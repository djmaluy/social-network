import React from "react";
import { Button, Icon } from "@material-ui/core";

export const AddPostButton = (props) => {
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
    props.updateNewPostText("");
  };

  let updateNewPostHandler = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };
  return (
    <>
      <div className="form-group ">
        <textarea
          onChange={updateNewPostHandler}
          ref={newPostElement}
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
