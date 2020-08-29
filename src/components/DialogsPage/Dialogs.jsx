import React from "react";
import classes from "./Dialogs.module.css";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

export const Dialogs = () => {
  return (
    <>
      <h1 className={classes.header}> Dialogs page</h1>
      <div className={classes.dialogs_items}>
        <div>
          <ul>
            <li>Andrew</li>
            <li>Oleg</li>
            <li>Dima</li>
            <li>Lena</li>
            <li>Alona</li>
          </ul>
        </div>
        <div>
          <div className="form-group">
            <textarea placeholder="Enter your message..."></textarea>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
