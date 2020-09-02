import React from "react";
import classes from "./Dialogs.module.css";
import { Message } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { SendMessageButton } from "./SendMessageButton";
import { Col, Row } from "react-bootstrap";

export const Dialogs = (props) => {
  let dialogs = props.dialogsPage.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messages = props.dialogsPage.messagesData.map((m) => (
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
          <SendMessageButton
            dispatch={props.dispatch}
            newDialogText={props.dialogsPage.newDialogText}
          />
        </Col>
      </Row>
    </div>
  );
};
