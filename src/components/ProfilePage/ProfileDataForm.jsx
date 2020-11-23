import React from "react";
import { reduxForm } from "redux-form";
import { createField, Element } from "../../common/FormsControl/FormControl";
import classes from "./Profile.module.css";

const Input = Element("input");
const Textarea = Element("textarea");

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button onClick={() => {}}>Save</button>
      </div>
      {error && <div className={classes.formSummaryError}>{error}</div>}
      <div>
        <b>Full name: </b>
        {createField("fullName", Input, [], "Enter full name", {
          type: "text",
        })}
      </div>
      <div>
        <b>Looking for a job: </b>
        {createField("LookinForAJob", Input, [], "", {
          type: "checkbox",
        })}
      </div>
      <div>
        <b>My skills: </b>
        {createField(
          "lookingForAJobDescription",
          Textarea,
          [],
          "My skills",
          {}
        )}
      </div>
      <div>
        <b>About me</b>:
        {createField("aboutMe", Textarea, [], "Enter some words", {})}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div className={classes.contacts} key={key}>
              <b>
                {" "}
                {key}:{"  "}
                {createField("contacts." + key, Input, [], key, {
                  type: "text",
                })}{" "}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({
  form: "editProfileData",
})(ProfileDataForm);

export default ReduxLoginForm;
