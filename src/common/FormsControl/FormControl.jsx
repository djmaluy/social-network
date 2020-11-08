import React from "react";
import classes from "./FormControl.module.css";

export const Element = (Element) => ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div
      className={classes.FormControl + " " + (hasError ? classes.error : "")}
    >
      <div>
        <Element {...input} {...props} />
      </div>

      {hasError && <span> {meta.error} </span>}
    </div>
  );
};
