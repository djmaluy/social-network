import classes from "../../common/FormsControl/FormControl.module.css";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { createField, Element } from "../../common/FormsControl/FormControl";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators";

const Input = Element("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField("email", Input, [required], "Enter your email", {
          type: "text",
        })}
      </div>
      <div>
        {createField("password", Input, [required], "Password", {
          type: "password",
        })}
      </div>
      <div>
        {createField(
          "rememberMe",
          Input,
          false,
          null,
          { type: "checkbox" },
          "remember Me"
        )}
      </div>
      {props.error && (
        <div className={classes.formSummaryError}>{props.error}</div>
      )}

      {props.captchaUrl && <img src={props.captchaUrl} alt="" />}
      {props.captchaUrl &&
        createField("captcha", Input, [required], "Enter symbols", {})}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({
  form: "login", // a unique identifier for this form
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
