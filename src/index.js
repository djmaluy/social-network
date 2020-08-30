import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

let dialogsData = [
  { id: 1, name: "Andrew" },
  { id: 2, name: "Oleg" },
  { id: 3, name: "Dima" },
  { id: 4, name: "Sveta" },
];

let messagesData = [
  { id: 1, message: "hello" },
  { id: 2, message: "hi" },
  { id: 3, message: "hi-hi" },
  { id: 4, message: "yo" },
];

let postData = [
  { id: 1, text: "hi" },
  { id: 2, text: "hi-hi" },
  { id: 3, text: "yo" },
];

ReactDOM.render(
  <BrowserRouter>
    <App
      dialogsData={dialogsData}
      messagesData={messagesData}
      postData={postData}
    />
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
