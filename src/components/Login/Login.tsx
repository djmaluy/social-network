import classes from "../../common/FormsControl/FormControl.module.css";
import React from "react";
import { Redirect } from "react-router-dom";
import {  InjectedFormProps, reduxForm } from "redux-form";
import { createField, Element } from "../../common/FormsControl/FormControl";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators";
import { AppStateType } from "../../redux/redux-store";
import { useSelector, useDispatch } from 'react-redux'


const Input = Element("input");

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createField("email", Input, [required], "Enter your email", { type: "text" })}
      </div>
      <div>
        {createField("password", Input, [required], "Password", { type: "password" })}
      </div>
      <div>
        {createField( "rememberMe", Input, false, null, { type: "checkbox" }, "remember Me" )}
      </div>
      {error && (
        <div className={classes.formSummaryError}>{error}</div>
      )}
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && createField("captcha", Input, [required], "Enter symbols", {})}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: "login"})(LoginForm);

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string 
}

export const Login: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType)  => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </>
  );
};

