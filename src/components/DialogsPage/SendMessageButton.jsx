import React from "react";
import { Button, Icon } from "@material-ui/core";

export const SendMessageButton = (props) => {
  let newMessageElement = React.createRef();

  let onAddNewMessage = () => {
    props.addMessage();
    props.updateNewDialogText("");
  };

  let updateNewDialogText = () => {
    let textNewMessage = newMessageElement.current.value;
    props.updateNewDialogText(textNewMessage);
  };
  return (
    <>
      <div className="form-group">
        <textarea
          value={props.newDialogText}
          onChange={updateNewDialogText}
          ref={newMessageElement}
          placeholder="Enter your message..."
        />
      </div>
      <div>
        <Button
          onClick={onAddNewMessage}
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
