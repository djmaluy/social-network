import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus } from "../../../redux/profileReducer";

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
          <span onDoubleClick={activateEditMode}>
            <b>Status: </b> {props.status || "------"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
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
