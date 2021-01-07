import { getUserData } from "./authReducer";

export const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type initialStateType = {
  initialized: boolean
}

let initialState:initialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: any):initialStateType => {
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

/* Action creators */

type setInitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const setInitializedSuccess = ():setInitializedSuccessActionType => ({
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
