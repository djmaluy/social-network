import React, { FC, useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import userPhoto from "../../assets/images/userPhoto.png";
import classes from "./Profile.module.css";
import ProfileDataForm from "./ProfileDataForm";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getStatus } from "../../redux/profile-selectors";
import { savePhoto, saveProfile } from "../../redux/profileReducer";
import { ProfileDataItems } from "./ProfileDataItems";


type PropsType = {
  isOwner: boolean
}
const ProfileInfo: FC<PropsType> = ({ isOwner }) => {
  const [editMode, setEditMode] = useState(false);
  const profile = useSelector(getProfile);
  const status = useSelector(getStatus);

  const dispatch = useDispatch();

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]));
    }
  };

  const onSubmit = (formData: any) => {
    //@ts-ignore
    dispatch(saveProfile(formData)).then(() => {
      setEditMode(false)
    });
  };

  return (
    <div>
      <div className={classes.contentHead}>
          <div>
            <div>
              <img
                src={profile.photos.large || userPhoto}
                alt=""
                className={classes.userAvatar}
              />
            </div>
            <div>
              {
              isOwner && <div className={classes.chooseAvatar}>
                            <input type="file" 
                                   onChange={onMainPhotoSelected} 
                                   name="file" id="file"
                                   className={classes.inputfile} />
                            <label htmlFor="file">Change avatar</label>
              </div>
              }
            </div>
          </div>
          <div className={classes.statusEditForm}>
            <div className={classes.profileStatusForm}>
              <ProfileStatusWithHooks status={status} /> 
                  {editMode ? (
                    <ProfileDataForm
                      initialValues={profile}
                      //@ts-ignore
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
      </div>
  </div>
  );
};

type ProfileDataPropsType = {
  profile: any
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button className={classes.formButton} onClick={goToEditMode}>Edit profile</button>
        </div>
      )}
      <ProfileDataItems profile={profile} />
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

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contacts}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default ProfileInfo;
