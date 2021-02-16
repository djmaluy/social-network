import { InferActionsTypes, BaseThunkType } from './redux-store';
import { stopSubmit } from "redux-form";
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { Dispatch } from 'redux';

let initialState = {
  messages: []  as ChatMessageType[]
};
export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES-RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
      };
        default:
      return state;
  }
};

/* Action creators & types */
type ActionsTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) => ({
    type: 'MESSAGES-RECEIVED', payload: { messages}} as const)  
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if(_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

/* thunk creator */
export const startMessagesListerning = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
  };
export const stopMessagesListerning = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
  };
 export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
  };
  
export default chatReducer;
