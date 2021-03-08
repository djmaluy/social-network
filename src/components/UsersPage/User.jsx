import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";

export const User = ({ user, unfollowUser, followUser, followingStart }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.status}</p>
      <NavLink to={"/profile/" + user.id}>
        <img
          className="usersPhoto"
          src={user.photos.small || userPhoto}
          alt=""
        />
      </NavLink>
      <div>
        {user.followed ? (
          <button
            disabled={followingStart.some((id) => id === user.id)}
            onClick={() => {
              unfollowUser(user.id);
            }}
          >
            unFollow
          </button>
        ) : (
          <button
            disabled={followingStart.some((id) => id === user.id)}
            onClick={() => {
              followUser(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
