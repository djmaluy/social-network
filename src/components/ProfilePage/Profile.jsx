import React from "react";
import { MyPosts } from "./MyPosts";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} />
      <MyPosts />
    </div>
  );
};

export default Profile;
