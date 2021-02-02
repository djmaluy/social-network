import { getProfile, getStatus } from "../../redux/profileReducer";
import React, { useEffect } from "react";
import Profile from "./Profile";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getAuthorizedUserId } from "../../redux/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// const setUsersProfile = actions.setUsersProfile;

export const ProfileContainer = (props) => {
  const authorizedUserId = useSelector(getAuthorizedUserId);
  const dispatch = useDispatch();
  const history = useParams();
  console.log(history);

  const refreshProfile = () => {
    let userId = history.userId;
    if (!userId) {
      userId = authorizedUserId;
    }
    dispatch(getProfile(userId));
    dispatch(getStatus(userId));
  };
  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <Profile
      isOwner={!history.userId}
      // updateStatus={this.props.updateStatus}
    />
  );
};

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// const mapStateToProps = (state) => {
//   return {
//
//     isAuth: state.auth.isAuth,
//   };
// };

// export default compose(
//   connect(mapStateToProps, {
//     setUsersProfile,
//     //     saveProfile,
//   }),
//   withRouter
//   // withAuthRedirect
// )(ProfileContainer);
