import React from "react";

export const ProfileDataItems = ({ profile }) => {
  return (
    <>
      <div>
        <b>Full name: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
      </div>

      <div>
        <b>My skills: </b>
        {profile.lookingForAJobDescription}
      </div>

      <div>
        <b>About me: </b> {profile.aboutMe}
      </div>
    </>
  );
};
