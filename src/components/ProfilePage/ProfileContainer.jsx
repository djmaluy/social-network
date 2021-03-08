import { getProfile, getStatus } from "../../redux/profileReducer";
import React, { useEffect } from "react";
import Profile from "./Profile";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getAuthorizedUserId } from "../../redux/auth-selectors";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export const ProfileContainer = () => {
  const authorizedUserId = useSelector(getAuthorizedUserId);
  const dispatch = useDispatch();
  const history = useParams();

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

  return <Profile isOwner={!history.userId} />;
};
