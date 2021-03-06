import { InferActionsTypes} from './redux-store';

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

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE':
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
type ActionsTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/


export const actions = {
    addMessage: (newMessageText: string) => ({ type: 'ADD_MESSAGE', newMessageText} as const)
}


export default dialogsReducer;