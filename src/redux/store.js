import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
  _state: {
    profilePage: {
      postData: [
        { id: 1, text: "hi" },
        { id: 2, text: "hi-hi" },
        { id: 3, text: "yo" },
      ],
      newPostText: "",
    },
    dialogsPage: {
      messagesData: [
        { id: 1, message: "hello" },
        { id: 2, message: "hi" },
        { id: 3, message: "hi-hi" },
        { id: 4, message: "yo" },
      ],
      dialogsData: [
        { id: 1, name: "Andrew" },
        { id: 2, name: "Oleg" },
        { id: 3, name: "Dima" },
        { id: 4, name: "Sveta" },
      ],
      newDialogText: "",
    },
  },
  _callSubscriber() {
    console.log("state was changed");
  },
  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
