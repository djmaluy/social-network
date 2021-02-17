import { StatusType } from './../api/chat-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { stopSubmit } from "redux-form";
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { Dispatch } from 'redux';



let initialState = {
  messages: []  as ChatMessageType[],
  status: 'pending' as StatusType
};
export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES-RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
      };
    case 'STATUS-CHANGED':
      return {
        ...state,
        status: action.payload.status
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
    type: 'MESSAGES-RECEIVED', payload: { messages}} as const),
  statusChanged: (status: StatusType) => ({
      type: 'STATUS-CHANGED', payload: { status }} as const)
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

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if(_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

/* thunk creator */
export const startMessagesListerning = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
  };
export const stopMessagesListerning = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
  };
 export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
  };
  
export default chatReducer;
