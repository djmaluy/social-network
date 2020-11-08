const ADD_MESSAGE = "ADD-MESSAGE";

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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            {
                let newMessage = {
                    id: 5,
                    message: action.newMessageText,
                };
                return {
                    ...state,
                    messagesData: [...state.messagesData, newMessage],
                };
            }

        default:
            return state;
    }
};

export const addMessageAC = (newMessageText) => ({
    type: ADD_MESSAGE,
    newMessageText,
});

export default dialogsReducer;