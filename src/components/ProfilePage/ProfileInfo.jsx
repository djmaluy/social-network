import React from "react";
import Preloader from "../../common/Preloader/Preloader";

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
    </>
  );
};

export default ProfileInfo;
