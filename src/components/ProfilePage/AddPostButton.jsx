import React from "react";
import { Button, Icon } from "@material-ui/core";

export const AddPostButton = () => {
  return (
    <>
      <div className="form-group ">
        <textarea placeholder="Enter your message..." />
      </div>
      <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>
        Add post
      </Button>
    </>
  );
};
