import { getUserData } from "./authReducer";

export const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type InitialStateType = {
  initialized: boolean,
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType  => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
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

type InitializedSuccessActionType ={
  type: typeof INITIALIZED_SUCCESS
}

export const setInitializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

/* thunk creator */
export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getUserData());

    Promise.all([promise]).then(() => {
      dispatch(setInitializedSuccess());
    });
  };
};

export default appReducer;
