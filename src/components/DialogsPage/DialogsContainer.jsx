import {
  addMessageAC,
  updateNewDialogTextAC,
} from "../../redux/dialogsReducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
