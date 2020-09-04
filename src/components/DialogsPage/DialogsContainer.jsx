import {
  addMessageAC,
  updateNewDialogTextAC,
} from "../../redux/dialogsReducer";
import { Dialogs } from "./Dialogs";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newDialogText: state.dialogsPage.newDialogText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewDialogText: (textNewMessage) => {
      dispatch(updateNewDialogTextAC(textNewMessage));
    },
    addMessage: () => {
      dispatch(addMessageAC());
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
