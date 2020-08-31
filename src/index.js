import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import state, { subscribe } from "./redux/state";
import {
  addPost,
  updateNewPostText,
  updateNewDialogText,
  addMessage,
} from "./redux/state";

export let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <App
        addMessage={addMessage}
        state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
        updateNewDialogText={updateNewDialogText}
      />
    </BrowserRouter>,

    document.getElementById("root")
  );

  serviceWorker.unregister();
};

rerenderEntireTree(state);
subscribe(rerenderEntireTree);
