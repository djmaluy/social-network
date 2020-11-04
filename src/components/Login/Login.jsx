import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = (props) => {
  return (
     <form onSubmit={props.onSubmit}>
      <div>
         <div>
          <Field
            name="login"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <div>
          <Field
            name="password"
            component={"input"}
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
         <div>
          <Field
            name="remeberMe"
            component="input"
            type="checkbox"
           /> remember Me
        </div>
      </div>
      <div>
         <button>Login</button>
      </div>
    </form>
  )
  };

  const ReduxLoginForm = reduxForm({
    form: 'login' // a unique identifier for this form
  })(LoginForm)

  const Login = (props) => {

    const onSubmit = (formData) => {
      console.log(formData);
    }
    return (
      <>
        <h1>Login</h1>
         <ReduxLoginForm onSubmit={onSubmit}/>
      </>
    )
  }


  export default Login;