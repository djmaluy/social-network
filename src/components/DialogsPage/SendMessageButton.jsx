import React from "react";
import { Button, Icon } from "@material-ui/core";
import {
  addMessageAC,
  updateNewDialogTextAC,
} from "../../redux/dialogsReducer";

export const SendMessageButton = (props) => {
  let onAddNewMessage = () => {
    props.dispatch(addMessageAC());
  };

  let updateNewDialogText = (e) => {
    let textNewMessage = e.target.value;
    props.dispatch(updateNewDialogTextAC(textNewMessage));
  };
  return (
    <>
      <div className="form-group">
        <textarea
          value={props.newDialogText}
          onChange={updateNewDialogText}
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
