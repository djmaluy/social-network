import { InferActionsTypes } from './redux-store';
import { getUserData } from "./authReducer";

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType  => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true,
      };
    }

    default:
      return state;
  }
};

/* Action creators & types */

type ActionsTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/

export const actions = {
  setInitializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
} 

/* thunk creator */
// type DispatchType = Dispatch<InitializedSuccessActionType>
export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getUserData());

    Promise.all([promise]).then(() => {
      dispatch(actions.setInitializedSuccess());
    });
  };
};

export default appReducer;
