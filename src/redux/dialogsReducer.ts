const ADD_MESSAGE = "ADD-MESSAGE";


type MessagesDataType = {
    id: number
    message: string
}
type DialogsDataType = {
    id: number
    name: string
}

let initialState = {
    messagesData: [
        { id: 1, message: "hello" },
        { id: 2, message: "hi" },
        { id: 3, message: "hi-hi" },
        { id: 4, message: "yo" },

    ] as Array<MessagesDataType>,

    dialogsData: [
        { id: 1, name: "Andrew" },
        { id: 2, name: "Oleg" },
        { id: 3, name: "Dima" },
        { id: 4, name: "Sveta" },

    ] as Array<DialogsDataType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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


type AddMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessageText: string
}

export const addMessageAC = (newMessageText: string): AddMessageActionType => ({
    type: ADD_MESSAGE,
    newMessageText
});

export default dialogsReducer;