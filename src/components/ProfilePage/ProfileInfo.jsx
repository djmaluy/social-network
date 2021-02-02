import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../assets/images/userPhoto.png";
import classes from "./Profile.module.css";
import ProfileDataForm from "./ProfileDataForm";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getStatus } from "../../redux/profile-selectors";
import { savePhoto, saveProfile } from "../../redux/profileReducer";

const ProfileInfo = ({ isOwner, ...props }) => {
  const [editMode, setEditMode] = useState(false);
  const profile = useSelector(getProfile);
  const status = useSelector(getStatus);

  const dispatch = useDispatch();

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  const onSubmit = (formData) => {
    dispatch(saveProfile(formData)).then(() => {
      setEditMode(false);
    });
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
          <ProfileStatusWithHooks status={status} />
          {editMode ? (
            <ProfileDataForm
              initialValues={profile}
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              profile={profile}
              isOwner={isOwner}
              goToEditMode={() => {
                setEditMode(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
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
      <b>{contactTitle}:</b>&nbsp;
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
