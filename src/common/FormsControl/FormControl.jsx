import React from "react";
import { Field } from "redux-form";
import classes from "./FormControl.module.css";

export const Element = (Element) => ({
  input,
  meta: { touched, error },
  ...props
}) => {
  const hasError = touched && error;
  return (
    <div
      className={classes.FormControl + " " + (hasError ? classes.error : "")}
    >
      <div>
        <Element {...input} {...props} />
      </div>

      {hasError && <span> {error} </span>}
    </div>
  );
};

export const createField = (
  name,
  component,
  validators,
  placeholder,
  props = {},
  text = ""
) => {
  return (
    <div>
      <Field
        name={name}
        component={component}
        validate={validators}
        placeholder={placeholder}
        {...props}
      />
      {text}
    </div>
  );
};
