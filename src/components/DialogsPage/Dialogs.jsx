import React from "react";
import classes from "./Dialogs.module.css";
import { Message } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { Col, Row } from "react-bootstrap";
import { Button, Icon } from "@material-ui/core";

export const Dialogs = (props) => {
  let onAddNewMessage = () => {
    props.addMessage();
  };

  let updateNewDialogText = (e) => {
    let textNewMessage = e.target.value;
    props.updateNewDialogText(textNewMessage);
  };
  let state = props.dialogsPage;
  let dialogs = state.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messages = state.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  return (
    <div className={classes.dialogsWrapper}>
      <Row className={classes.dialogs}>
        <Col sm={4} className={classes.dialogsItems}>
          {dialogs}
        </Col>
        <Col sm={8}>
          {messages}
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
        </Col>
      </Row>
    </div>
  );
};
