let rerenderEntireTree = () => {};

let state = {
  profilePage: {
    postData: [
      { id: 1, text: "hi" },
      { id: 2, text: "hi-hi" },
      { id: 3, text: "yo" },
    ],
    newPostText: "only for test",
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
    newDialogText: "Only for test",
  },
};

window.state = state;

export const addPost = () => {
  let newPost = {
    id: 4,
    text: state.profilePage.newPostText,
  };
  state.profilePage.postData.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export const addMessage = () => {
  let newMessage = {
    id: 6,
    message: state.dialogsPage.newDialogText,
  };
  state.dialogsPage.messagesData.push(newMessage);
  state.dialogsPage.newDialogText = "";
};
export const updateNewDialogText = (dialogText) => {
  state.dialogsPage.newDialogText = dialogText;
  rerenderEntireTree(state);
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
};

export default state;
