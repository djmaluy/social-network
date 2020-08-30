import React from "react";
import { Button, Icon } from "@material-ui/core";

export const SendMessageButton = () => {
  return (
    <>
      <div className="form-group">
        <textarea placeholder="Enter your message..." />
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </>
  );
};
