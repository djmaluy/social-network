import { getUserData } from "./authReducer";

export const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

let initialState = {
  initializated: false,
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

/* thunk creator */
export const initializeApp = () => {
  return (dispatch) => {
    let promise = dispatch(getUserData());

    Promise.all([promise]).then(() => {
      dispatch(setInitializedSuccess());
    });
  };
};

export default appReducer;
