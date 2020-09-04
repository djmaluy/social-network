const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_DIALOG_TEXT = "UPDATE-NEW-DIALOG-TEXT";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let newMessage = {
        id: 5,
        message: state.newDialogText,
      };
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
        newDialogText: "",
      };
    }
    case UPDATE_NEW_DIALOG_TEXT: {
      return {
        ...state,
        newDialogText: action.dialogText,
      };
    }
    default:
      return state;
  }
};

export const addMessageAC = () => ({
  type: ADD_MESSAGE,
});

export const updateNewDialogTextAC = (textNewMessage) => ({
  type: UPDATE_NEW_DIALOG_TEXT,
  dialogText: textNewMessage,
});

export default dialogsReducer;
