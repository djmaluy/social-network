import React from "react";
import classes from "./Dialogs.module.css";
import { Message } from "./Message/Message";
import { DialogItem } from "./DialogItem/DialogItem";
import { Col, Row } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { maxLength, required } from "../../utils/validators";
import { Element } from "../../common/FormsControl/FormControl";

export const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogs = state.dialogsData.map((d) => (
    <DialogItem name={d.name} id={d.id} key={d.id} />
  ));
  let messages = state.messagesData.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  const onAddNewMessage = (values) => {
    props.addMessage(values.newMessageText);
  };

  return (
    <div className={classes.dialogsWrapper}>
      <Row className={classes.dialogs}>
        <Col sm={4} className={classes.dialogsItems}>
          {dialogs}
          <AddMessageReduxForm onSubmit={onAddNewMessage} />
        </Col>
        <Col sm={8}>{messages}</Col>
      </Row>
    </div>
  );
};

const Textarea = Element("textarea");
const maxlength50 = maxLength(50);

const AddMessage = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <Field
          validate={[required, maxlength50]}
          name="newMessageText"
          component={Textarea}
          placeholder="Enter your message..."
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({ form: "AddNewMessage" })(AddMessage);
