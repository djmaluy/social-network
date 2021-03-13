import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/profileReducer";
import classes from "../Profile.module.css";

const ProfileStatusWithHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateStatus(status));
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <b>Status: </b>
          <span
            onDoubleClick={activateEditMode}
            className={classes.profileStatus}
          >
            {props.status || "------"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            className={classes.inputStatus}
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          ></input>
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;
