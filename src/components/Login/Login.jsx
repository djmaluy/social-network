import classes from "../../common/FormsControl/FormControl.module.css";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Element } from "../../common/FormsControl/FormControl";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators";

const Input = Element("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <div>
          <Field
            name={"email"}
            component={Input}
            validate={required}
            type="text"
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name={"password"}
            component={Input}
            validate={required}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <div>
          <Field name={"rememberMe"} component={Input} type="checkbox" />
          remember Me
        </div>
      </div>
      {props.error && (
        <div className={classes.formSummaryError}>{props.error}</div>
      )}

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
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
