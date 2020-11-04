import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <>
      <div>
        <img src={props.profile.photos.large} alt="" />
        <div>{props.profile.fullName}</div>
      </div>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
    </>
  );
};

export default ProfileInfo;
