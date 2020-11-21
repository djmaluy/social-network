import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../assets/images/userPhoto.png";
import classes from "./Profile.module.css";

const ProfileInfo = ({ profile, savePhoto, isOwner, status, ...props }) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <>
      <div>
        <div>
          <img
            src={profile.photos.large || userPhoto}
            alt=""
            className={classes.userAvatar}
          />

          {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
          <ProfileStatusWithHooks
            status={status}
            updateStatus={props.updateStatus}
          />
          <ProfileData profile={profile} />
        </div>
      </div>
    </>
  );
};

const ProfileData = ({ profile }) => {
  return (
    <div>
      <div>
        <b>Full name: </b>
        {profile.fullName}
      </div>
      <div>
        <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My skills: </b>
          {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me: </b> {profile.aboutMe}
      </div>
      <div>
        <b>Contacts: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contacts}>
      <b>{contactTitle}:</b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
