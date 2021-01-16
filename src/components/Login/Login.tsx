import classes from "../../common/FormsControl/FormControl.module.css";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {  InjectedFormProps, reduxForm } from "redux-form";
import { createField, Element } from "../../common/FormsControl/FormControl";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators";
import { AppStateType } from "../../redux/redux-store";

const Input = Element("input");

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps > & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
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
      {error && (
        <div className={classes.formSummaryError}>{error}</div>
      )}

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField("captcha", Input, [required], "Enter symbols", {})}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm);

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchPropsType = {
  login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string 
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType)  => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
